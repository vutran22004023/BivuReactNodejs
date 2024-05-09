import mongoose from "mongoose";

const oderSchema =  new mongoose.Schema(
    {
        logo_1: {
            type: String,
            required: true,
        },
        logo_2: {
            type: String,
            required: true,
        },
        image_slider: [
            {
                type: String,
                required: true,
                maxItems: 8,
            }
        ],
        image_right: [
            {
                type: String,
                required: true,
                maxItems: 2,
            }
        ],
        image_bottom: [
            {
                type: String,
                required: true,
                maxItems: 3,
            }
        ],
        title_1 : {
            type: String,
            required: true,
        },
        title_2 : {
            type: String,
            required: true,
        },
        title_3 : {
            type: String,
            required: true,
        },
        title_4 : {
            type: String,
            required: true,
        },
        link_fb: {
            type: String,
            required: true,
        },
        link_tt: {
            type: String,
            required: true,
        },
        link_shoppee: {
            type: String,
            required: true,
        },
        image_qc_1: {
            type: String,
            required: true,
        },
        image_qc_2: {
            type: String,
            required: true,
        },
        image_qc_3: {
            type: String,
            required: true,
        },
        image_qc_4: {
            type: String,
            required: true,
        },
        image_qc_5: {
            type: String,
            required: true,
        },
        link_qc_1: {
            type: String,
            required: true,
        },
        link_qc_2: {
            type: String,
            required: true,
        },
        link_qc_3: {
            type: String,
            required: true,
        },
        link_qc_4: {
            type: String,
            required: true,
        },
        link_qc_5: {
            type: String,
            required: true,
        },
        
    }
)

const color = mongoose.model('color',oderSchema)

export default color