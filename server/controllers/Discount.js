import {DiscountServicres} from '../services/index.js'

const createDiscount = async(req, res) => {
    try {
        const {name,discountPercent,startDate,endDate,discountAmount,status,quantity,description} = req.body;
    
        if(!name ||!discountPercent ||!startDate ||!endDate ||!discountAmount ) {
            return res.status(200).json({
                status: 'ERR',
                message: "Chưa điền đầy đủ thông tin giảm giá"
            })
        }
    
        const response = await DiscountServicres.createDiscount(req.body)
        return res.status(200).json(response)
        }catch (e) {
            return res.status(404).json({
                message: e
            })
        }
}

const getAllDiscounts = async(req, res) => {
    try {
    
        const response = await DiscountServicres.getAllDiscount()
        return res.status(200).json(response)
        }catch (e) {
            return res.status(404).json({
                message: e
            })
        }
}

const getDiscountDetail = async(req, res) => {
    try {
        const id = req.params.id
        if(!id) {
            return res.status(200).json({
                status: 'ERR',
                message: "Không tìm thấy id"
            })
        }
        const response = await DiscountServicres.getDiscountDetail(id)
        return res.status(200).json(response)
        }catch (e) {
            return res.status(404).json({
                message: e
            })
        }
}

const updateDiscount = async(req, res) => {
    try{
        const id = req.params.id
        const data = req.body

        if(!id) {
            return res.status(200).json({
                status: 'Err',
                message: 'id không tồn tại'
            })
        }
        const response = await DiscountServicres.updateDiscount(id,data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteDiscount = async(req, res) => {
    try{
        const id = req.params.id
        if(!id) {
            return res.status(200).json({
                status: 'Err',
                message: 'id không tồn tại'
            })
        }
        const response = await DiscountServicres.deleteDiscount(id)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

export default {
    createDiscount,
    getAllDiscounts,
    getDiscountDetail,
    updateDiscount,
    deleteDiscount
}