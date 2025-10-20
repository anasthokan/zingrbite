import express from "express";
import Offer from "../models/offerModel.js";

const router = express.Router();

// ✅ Get all offers
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: "Failed to load offers" });
  }
});

// ✅ Add new offer
router.post("/", async (req, res) => {
  try {
    const { name, price, img, desc } = req.body;
    const newOffer = new Offer({ name, price, img, desc });
    await newOffer.save();
    res.status(201).json({ message: "✅ Offer added successfully!", newOffer });
  } catch (error) {
    res.status(500).json({ message: "Error adding offer" });
  }
});

// ✅ Delete offer
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Offer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Offer not found" });
    res.json({ message: "🗑️ Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting offer" });
  }
});

// ✅ Update offer
router.put("/:id", async (req, res) => {
  try {
    const updated = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Offer not found" });
    res.json({ message: "✏️ Offer updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating offer" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, img, desc } = req.body;
    if (!name || !price || !desc)
      return res.status(400).json({ message: "Missing required fields" });

    const newOffer = new Offer({ name, price, img, desc });
    await newOffer.save();
    res.status(201).json({ message: "✅ Offer added successfully", newOffer });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
