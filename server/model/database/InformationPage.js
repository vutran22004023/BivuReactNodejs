import mongoose from "mongoose";

const oderSchema =  new mongoose.Schema(
    {   
        namePage: {
            type: String,
        },
        description: {
            type: String,
        },
        logo_1: [
            {
                type: String,
            }
        ],
        logo_2: [
            {
                type: String,
            }
        ],
        image_slider: [
            {
                type: String,
                maxItems: 8,
            }
        ],
        image_right: [
            {
                type: String,
                maxItems: 2,
            }
        ],
        image_bottom: [
            {
                type: String,
                maxItems: 3,
            }
        ],
        title_1 : {
            type: String,
        },
        title_2 : {
            type: String,
        },
        title_3 : {
            type: String,
        },
        title_4 : {
            type: String,
        },
        link_fb: {
            type: String,
        },
        link_tt: {
            type: String,
        },
        link_shoppee: {
            type: String,
        },
        image_qc_1: [
            {
                type: String,
            }
        ],
        image_qc_2: [
            {
                type: String,
            }
        ],
        image_qc_3: [
            {
                type: String,
            }
        ],
        image_qc_4: [
            {
                type: String,
            }
        ],
        image_qc_5: [
            {
                type: String,
            }
        ],
        link_qc_1: {
            type: String,
        },
        link_qc_2: {
            type: String,
        },
        link_qc_3: {
            type: String,
        },
        link_qc_4: {
            type: String,
        },
        link_qc_5: {
            type: String,
        },
        
    }
)

const color = mongoose.model('information_pages',oderSchema)

export default color