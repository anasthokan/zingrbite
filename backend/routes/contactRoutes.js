import express from "express";
import Contact from "../models/contactModel.js";

const router = express.Router();

// ✅ POST: Add new contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ message: "Please fill all fields" });

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({
      message: "✅ Thank you for contacting us! We'll get back soon.",
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error saving message", error });
  }
});

// ✅ GET: Fetch all contact messages
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// ✅ DELETE: Delete a contact message
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "🗑️ Contact message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message", error });
  }
});

export default router;
