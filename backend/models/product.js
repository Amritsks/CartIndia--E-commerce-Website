import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    customerreview: String,
    imageUrl:{ type: String, required: true },
},{
    timestamps: true
});


const Product = mongoose.model("product", productSchema);
export default Product;