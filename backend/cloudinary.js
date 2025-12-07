
import express from "express";
import multer from "multer";
// import pakg from "multer-storage-cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary";

import {v2 as cloudinary} from "cloudinary";

// const {cloudinary} = pakg;

const router = express.Router();

// Configuring Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        allowed_formats:["jpg","png", "jpeg"]
    },
});

const upload = multer({storage});

// upload part
router.post("/upload", upload.single("image"), (req,res) =>
{
    try{
        res.json({
            success: true,
            url: req.file.path,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, message: "Upload Failed"});
    }
});

export default router;