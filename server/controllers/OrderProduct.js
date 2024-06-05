import {OrderProductservices} from '../services/index.js'

const getAllOrderProduct = async(req, res) => {
    try {
        const {limit= 50,page} = req.query
        const response = await OrderProductservices.getAllOrderProduct(limit,page)
        return res.status(200).json(response)
    }catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const createOrderProduct = async(req, res) => {
    try {
        const {orderItem,paymentMethod,itemsPrice,shippingPrice, totalPrice,fullName, address, city, phone,user,email,note_customers,voucher} = req.body

    if(!orderItem||!paymentMethod ||!itemsPrice ||!shippingPrice||!totalPrice||!fullName||!address||!city||!phone|| !user || !email) {
        return res.status.json({
            status: 'ERR',
            message: 'Chưa điền đẩy đủ thông tin'
        })   
    }
        const response =  await OrderProductservices.createOrderProductservices(req.body)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getOrderDetail =  async(req, res)=> {
    try {
        const uidorder = req.params.id
        if(!uidorder) {
            return  {
                status: 'ERR',
                message: 'Không có id của đơn hàng này'
            }
        }

        const response =  await OrderProductservices.getOrderDetail(uidorder)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getOrderDetailProduct =  async(req, res)=> {
    try {
        const uidorder = req.params.id
        if(!uidorder) {
            return  {
                status: 'ERR',
                message: 'Không có id của đơn hàng này'
            }
        }

        const response =  await OrderProductservices.getOrderDetailProduct(uidorder)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}
const updateOrderProduct = async(req, res)=> {
    try {
        const uidorder = req.params.id
        const data = req.body
        if(!uidorder) {
            return  {
                status: 'ERR',
                message: 'Không có id của đơn hàng này'
            }
        }

        const response =  await OrderProductservices.updateOrderProduct(uidorder,data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }

}


const getAllOrderProductDate = async(req, res) => {
    try {
        const datestart = req.params.datestart
        const datesend = req.params.datesend
        if(!datestart || !datesend) {
            return  {
                status: 'ERR',
                message: 'chưa đầy đủ'
            }
        }
        const startDate = new Date(datestart);
        const endDate = new Date(datesend);
        endDate.setHours(23, 59, 59, 999);

        const response =  await OrderProductservices.getAllOrderProductDate(startDate,endDate)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDashboard = async(req, res) => {
    try{
        const response =  await OrderProductservices.getDashboard()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrderProductIsdeliveredfalse = async(req, res) => {
    try{
        const {limit= 50,page} = req.query
        const response =  await OrderProductservices.getAllOrderProductIsdeliveredfalse(limit,page)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

export default {
    createOrderProduct,
    getOrderDetail,
    getOrderDetailProduct,
    getAllOrderProduct,
    updateOrderProduct,
    getAllOrderProductDate,
    getDashboard,
    getAllOrderProductIsdeliveredfalse
}