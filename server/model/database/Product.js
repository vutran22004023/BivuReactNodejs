import mongoose from "mongoose";

const ProductSchema =  new mongoose.Schema(
    {
    name: {
        type: String,
        require: true,
        unique: true,
    },
    slug: {
        type: String,
        require: true,
    },
    image: [
        {
            type: String,
            require: true,
        }
    ],
    type: {
        type: String,
        require: true, 
    },
    rating: {
        type: Number,
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
    quality: {
        type: Number,
    },
    linksshopee: {
        type: String,
    },
    idColor: [
        {
            type: String,
        }
    ],
    categorySize: [
        {
            size: {
                type: String,
                required: true,
            },
            price: {
                type:String,
                required: true,
            },
            counInStock: {
                type:String,
                required: true,
            }
        }
    ]
},{
    timestamps: true,
}
)

const Product = mongoose.model('Product',ProductSchema)

export default Product