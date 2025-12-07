import express from "express";
// use the correct model that contains userId and a safe export
import Order from "../models/orderModel.js";

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order saved successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("Order Save Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch Orders of a User
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Order Fetch Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
