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
    dealsoc: {
        type: Boolean,
        default:false,
    },
    detailproduct: [
        {
            title: {
                type: String,
            },
            description: {
                type: String,
            }
        }
    ],
    categorySize: [
        {
            size: {
                type: String,
            },
            price: {
                type:Number,
                required: true,
            },
            counInStock: {
                type:Number,
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