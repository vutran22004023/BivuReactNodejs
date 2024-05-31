import {ReviewProductServicres} from '../services/index.js'
const createReviewProduct = async(req, res) => {
    try {
        const {productId,userId,product,userName,rating,comments} = req.body;
    
        if(!productId ||!userId ||!product || !userName || !rating || !comments ) {
            return res.status(200).json({
                status: 'ERR',
                message: "Chưa điền đầy đủ thông tin sản phẩm"
            })
        }
    
        const response = await ReviewProductServicres.createReviewProduct(req.body)
        return res.status(200).json(response)
        }catch (e) {
            return res.status(404).json({
                message: e
            })
        }
}

const updateReviewProduct = async(req, res) => {
    try{
        const id = req.params.id
        const iduser = req.params.iduser
        const data = req.body

        if(!id) {
            return res.status(200).json({
                status: 'Err',
                message: 'id không tồn tại'
            })
        }
        const response = await ReviewProductServicres.updateReviewProduct(id,iduser,data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getReviewProduct = async(req, res) => {

    try{
        const productId = req.params.productId
        if(!productId) {
            return res.status(200).json({
                status: 'Err',
                message: 'id không tồn tại'
            })
        }
        const response = await ReviewProductServicres.getReviewProduct(productId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getReviewProductAll = async(req, res) => {
    try{
        const response = await ReviewProductServicres.getReviewProductAll()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

export default {
    createReviewProduct,
    updateReviewProduct,
    getReviewProduct,
    getReviewProductAll
}