import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 10000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${port}`);
    });

  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();