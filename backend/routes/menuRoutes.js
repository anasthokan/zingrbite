import express from "express";
import Menu from "../models/menuModel.js";

const router = express.Router();

// ✅ Get all menu items
router.get("/", async (req, res) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to load menu items" });
  }
});

// ✅ Add a new menu item
router.post("/", async (req, res) => {
  try {
    const { name, price, category, image } = req.body;
    const newItem = new Menu({ name, price, category, image });
    await newItem.save();
    res.status(201).json({ message: "✅ Item added successfully!", newItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding item" });
  }
});

// ✅ Delete a menu item
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Menu.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "🗑️ Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

// ✅ Update a menu item
router.put("/:id", async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "✏️ Item updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating item" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, category, image } = req.body;
    if (!name || !price || !category)
      return res.status(400).json({ message: "Missing required fields" });

    const newItem = new Menu({ name, price, category, image });
    await newItem.save();
    res.status(201).json({ message: "✅ Menu item added successfully", newItem });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
