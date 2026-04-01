import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "../../backend/database/connection.js";
import { errorMiddleware } from "../../backend/middlewares/error.js";
import userRouter from "../../backend/router/userRoutes.js";
import auctionItemRouter from "../../backend/router/auctionItemRoutes.js";
import bidRouter from "../../backend/router/bidRoutes.js";
import commissionRouter from "../../backend/router/commissionRouter.js";
import superAdminRouter from "../../backend/router/superAdminRoutes.js";
import { endedAuctionCron } from "../../backend/automation/endedAuctionCron.js";
import { verifyCommissionCron } from "../../backend/automation/verifyCommissionCron.js";

config();

const app = express();

// CORS configuration for Netlify
app.use(
  cors({
    origin: ["https://sparkly-douhua-20edb3.netlify.app", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/superadmin", superAdminRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Auction API is running" });
});

app.use(errorMiddleware);

// Connect to database and start crons
let isConnected = false;

const connectDB = async () => {
  if (!isConnected) {
    await connection();
    endedAuctionCron();
    verifyCommissionCron();
    isConnected = true;
  }
};

export default async (req, res) => {
  try {
    await connectDB();

    // Handle the request through Express
    app(req, res);
  } catch (error) {
    console.error("Netlify function error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};