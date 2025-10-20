import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true }, // String because price can include ₹ or text like "Free"
    img: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
