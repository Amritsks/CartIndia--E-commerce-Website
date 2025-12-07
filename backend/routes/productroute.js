import express from "express";
import Product from "../models/product.js";

const router = express.Router();

//  This will be commented because the same logic allready done in cloudinaryroute.js

// Adding new product
// router.post("/", async (req, res) => {
//     try {
//         const { name, price, description, customerreview, imageUrl } = req.body;

//         if (!imageUrl) {
//             return res.status(400).json({ error: "imageUrl is required" });
//         }

//         const product = new Product({
//             name,
//             price,
//             description,
//             customerreview,
//             imageUrl,
//         });

//         const savedProduct = await product.save();

//         // Emit real-time update
//         const io = req.app.get("io");
//         if (io) {
//             io.emit("newProduct", savedProduct);
//         }

//         res.status(201).json({ message: "Product Saved Successfully", savedProduct });
//     } catch (error) {
//         console.log("Product save failed:", error);
//         res.status(500).json({ error: error.message });
//     }
// });


// fetching all product
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product", error);
        res.status(500).json({ message: error.message });
    }
});



export default router;