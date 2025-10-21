import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import menuRoutes from "./routes/menuRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// ✅ Load environment variables
dotenv.config();
console.log("🔍 Loaded MONGO_URI =", process.env.MONGO_URI);

// ✅ Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
};
connectDB();

// ✅ API routes
app.use("/api/menu", menuRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Serve React frontend build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/build")));

// ✅ Fix for Express 5 — use regex instead of "/*"
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

// ✅ Default test route (optional)
app.get("/", (req, res) => res.send("Server running successfully!"));

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));