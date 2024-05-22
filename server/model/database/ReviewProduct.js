import mongoose from "mongoose";

const oderSchema =  new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required: true,
        },
        userId: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: [
            {
                name: {
                    type: String,
                },
                size: {
                    type: String,
                },
                color: {
                    type: String,
                },
            }
        ],
        userName: {
            type: String,
        },
        avatar: {
            type: String,
        },
        rating: {
            type: Number,
        },
        comments: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }
)

const ReviewProduct = mongoose.model('ReviewProduct',oderSchema)

export default ReviewProduct