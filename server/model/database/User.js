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
    avatar: {
        type: String,
    },
    order_Address: [
        {   
            full_name: {
                type: String,
            },
            phone: {
                type: String,
            },
            address: {
                type: String,
            },
            city: {
                type: String,
            },
            district: {
                type: String,
            },
            rard: {
                type: String,
            },
            nameCity: {
                type: String,
            },
            nameDistrict: {
                type: String,
            },
            nameRard: {
                type: String,
            },
            specific_address: {
                type:String,
            },
        }
    ]
},{
    timestamps: true,
}
)

const User = mongoose.model('User',UserSchema)

export default User