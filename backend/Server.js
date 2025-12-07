import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

import cloudinaryroute from "./routes/cloudinaryroute.js";
import productroute from "./routes/productroute.js";
import orderroute from "./routes/orderroute.js";
import contactRoute from "./routes/contactRoute.js";
import authRoute from "./routes/authRoute.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/orders", orderroute);
app.use("/api/contact", contactRoute);
app.use("/api/auth", authRoute);


// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongo DB Connected"))
    .catch(err => console.error("Mongo Error:", err));

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// Socket.IO Setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "https://cart-india-e-commerce-website.vercel.app/" }
});

app.set("io", io);

// Socket events
io.on("connection", (socket) => {
    console.log("Client Connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client Disconnected:", socket.id);
    });
});

// Routes
app.use("/api/products/upload", cloudinaryroute); // <-- put this first
app.use("/api/products", productroute);           // <-- then product routes


// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
