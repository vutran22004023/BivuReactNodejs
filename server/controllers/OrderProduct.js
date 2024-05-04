import {OrderProductservices} from '../services/index.js'


const createOrderProduct = async(req, res) => {
    try {
        const {oderItem,paymentMethod,itemsPrice,shippingPrice, totalPrice,fullName, address, city, phone,user,email} = req.body
    if(!oderItem||!paymentMethod ||!itemsPrice ||!shippingPrice||!totalPrice||!fullName||!address||!city||!phone|| !user || !email) {
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

export default {
    createOrderProduct,
    getOrderDetail,
    getOrderDetailProduct
}