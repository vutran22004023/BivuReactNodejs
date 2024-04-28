import {OrderProductservices} from '../services/index.js'


const createOrderProduct = async(req, res) => {
    try {
        const {oderItem,paymentMethod,itemsPrice,shippingPrice, totalPrice,fullName, address, city, phone,user} = req.body
    if(!oderItem||!paymentMethod ||!itemsPrice ||!shippingPrice||!totalPrice||!fullName||!address||!city||!phone|| !user) {
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

export default {
    createOrderProduct
}