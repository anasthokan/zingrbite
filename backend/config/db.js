import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🔍 Mongo URI:", process.env.MONGO_URI); // debug line
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
