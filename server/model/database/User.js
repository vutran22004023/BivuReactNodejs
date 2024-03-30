import mongoose from "mongoose";

const UserSchema =  new mongoose.Schema(
    {
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin:  {
        type: Boolean,
        default: false,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    avatar: {
        type: String,
    }
},{
    timestamps: true,
}
)

const User = mongoose.model('User',UserSchema)

export default User