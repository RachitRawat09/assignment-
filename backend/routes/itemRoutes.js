// backend/routes/itemRoutes.js
import express from "express";
import Item from "../models/Item.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create item
router.post("/", authMiddleware, async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error creating item", error: err.message });
  }
});

// Get items with filters
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    let query = {};

    // Category filter (partial + case-insensitive)
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const items = await Item.find(query);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items", error: err.message });
  }
});

// Update item
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error updating item", error: err.message });
  }
});

// Delete item
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item", error: err.message });
  }
});

export default router;
