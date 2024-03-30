import mongoose from "mongoose";

const ProductSchema =  new mongoose.Schema(
    {
    name: {
        type: String,
        require: true,
        unique: true,
    },
    image: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    price:  {
        type: Number,
        required: true,
    },
    counInStock: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
    },
    selled: {
        type: Number,
    },
},{
    timestamps: true,
}
)

const Product = mongoose.model('Product',ProductSchema)

export default Product