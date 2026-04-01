import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRoutes.js";
import auctionItemRouter from "./router/auctionItemRoutes.js";
import bidRouter from "./router/bidRoutes.js";
import commissionRouter from "./router/commissionRouter.js";
import superAdminRouter from "./router/superAdminRoutes.js";
import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";

const app = express();
config({
  path: "./.env",
});

// CORS configuration for Vercel deployment
const corsOrigins = process.env.NODE_ENV === 'production'
  ? [
      process.env.FRONTEND_URL,
      'https://auction-frontend.vercel.app',
      'https://auction-frontend-git-main.vercel.app',
      'https://auction-frontend-*.vercel.app'
    ].filter(Boolean)
  : ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: corsOrigins,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  })
);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Auction Platform Backend is running on Vercel',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    platform: 'vercel'
  });
});

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/superadmin", superAdminRouter);

// For Vercel serverless, handle database connection per request
let isConnected = false;

const connectDB = async () => {
  if (!isConnected) {
    try {
      await connection();
      isConnected = true;
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }
};

// Middleware to ensure database connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Database connection failed'
    });
  }
});

// Initialize cron jobs only in development or when explicitly enabled
if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_CRON === 'true') {
  try {
    endedAuctionCron();
    verifyCommissionCron();
    console.log('Cron jobs initialized');
  } catch (error) {
    console.error('Error initializing cron jobs:', error);
  }
}

app.use(errorMiddleware);

export default app;
