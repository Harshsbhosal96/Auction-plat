import app from "../app.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../.env" });

// Export the Express app for Vercel
export default app;