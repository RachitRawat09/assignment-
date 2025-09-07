// backend/routes/cartRoutes.js
import express from "express";
import Cart from "../models/Cart.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get cart
router.get("/", authMiddleware, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user }).populate("items.item");
  if (!cart) cart = await Cart.create({ user: req.user, items: [] });
  res.json(cart);
});

// Add to cart
router.post("/add", authMiddleware, async (req, res) => {
  const { itemId } = req.body;
  let cart = await Cart.findOne({ user: req.user });
  if (!cart) cart = await Cart.create({ user: req.user, items: [] });

  const existing = cart.items.find(i => i.item.toString() === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ item: itemId, quantity: 1 });
  }
  await cart.save();
  res.json(cart);
});

// Remove from cart
router.post("/remove", authMiddleware, async (req, res) => {
  const { itemId } = req.body;
  let cart = await Cart.findOne({ user: req.user });
  if (!cart) return res.json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i.item.toString() !== itemId);
  await cart.save();
  res.json(cart);
});

export default router;
