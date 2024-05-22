import mongoose from "mongoose";

const oderSchema =  new mongoose.Schema(
    {
    oderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            image: [
                {
                    type: String,
                    required: true,
                }
            ],
            category: 
                {
                    type: String,
                },
            price: {
                type: Number,
                required: true,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required: true,
            },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required: true,
            }
        }
    ],
    shippingAddress: {
        fullName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        }
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
    },
    shippingPrice: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    confirmation_Order: {
        type: Boolean,
        default:false,
    },
    note_customers: {
        type: String,
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPaid: {
        type: Boolean,
        default:false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    review: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    }

},{
    timestamps: true,
}
)

const oderProduct = mongoose.model('oderProduct',oderSchema)

export default oderProduct