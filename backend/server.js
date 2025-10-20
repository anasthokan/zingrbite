import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import menuRoutes from "./routes/menuRoutes.js"; 
import offerRoutes from "./routes/offerRoutes.js"; 
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config(); // ✅ Loads your .env file
console.log("🔍 Loaded MONGO_URI =", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

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

app.use("/api/menu", menuRoutes);
app.use("/api/offers", offerRoutes); 
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => res.send("Server running successfully!"));
app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
);
