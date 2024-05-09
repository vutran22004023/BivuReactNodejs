import mongoose from "mongoose";

const oderSchema =  new mongoose.Schema(
    {
        hex : {
            type: String,
        },
        color_name: {
            type: String,
        }
    }
)

const color = mongoose.model('color',oderSchema)

export default color