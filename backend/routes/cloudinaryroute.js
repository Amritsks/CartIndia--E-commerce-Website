import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, customerreview } = req.body;

    if (!req.file) return res.status(400).json({ error: "No image!" });

    const uploaded = await cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      async (error, result) => {
        if (error) return res.status(500).json({ error });

        const product = new Product({
          name,
          price,
          description,
          customerreview,
          imageUrl: result.secure_url,
        });
        await product.save();

        const io = req.app.get("io");
        if (io) io.emit("newProduct", product);

        res.json({ success: true, product });
      }
    );

    uploaded.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
