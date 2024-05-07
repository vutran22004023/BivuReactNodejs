import { OrderProductModel,ProductModel } from "../model/index.js";
import {Emailservicres} from './index.js'

const createOrderProductservices = async (newOrder) => {
    try {
        const {oderItem,paymentMethod,itemsPrice,shippingPrice, totalPrice,fullName, address, city, phone,user,email} =  newOrder
        const promises = oderItem.map(async(order) => {
            const productData = await ProductModel.findOneAndUpdate(
                {
                    _id: order.product,
                    counInStock: { $gte: order.amount }
                },
                {
                    $inc: {
                        counInStock: -order.amount,
                        selled: +order.amount 
                    }
                },
                { new: true }
            );
            if(productData) {
                const createProduct = await OrderProductModel.create({
                oderItems: oderItem,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    phone
                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user
    
            })
            if(createProduct) {
                await Emailservicres.sendEmailCreateOrder(newOrder)
                return {
                    status: 200,
                    message: "Thêm sản phẩm thành công",
                    data: {
                      ...createProduct._doc,
                    },
            }
        }
            }else {
                return {
                    status: 'ERR',
                    message: "Hiện tại kho hàng đang hết sản phẩm này",
                    data: [ order.product]
                }
            }
        })
        const results = await Promise.all(promises)
        const newData = results.filter((item) => item._id)
        if(newData.length) {
            return {
                status: 'ERR',
                message: `Sản phẩm với id: ${newData.join(', ')} không đủ hàng`,
            }
        }
        return {
            status: 200,
            message: 'Success'
        }
}
    catch(e) {
        console.log(e)
    }
}


const getOrderDetail = async(uidorder) => {
    try {
        const order = await OrderProductModel.find({
            user: uidorder
        })
        if(order === null) {
            return {
                status: 'ERR',
                message: 'Không có cái id này'
            }    
        }
        return {
            status: 200,
            message: 'Đã show dữ liệu thành công',
            data: order
        }
    }catch(e) {

    }
}

const getOrderDetailProduct = async(uidorder) => {
    try {
        const order = await OrderProductModel.findById({
            _id: uidorder
        })
        if(order === null) {
            return {
                status: 'ERR',
                message: 'Không có cái id này'
            }    
        }
        return {
            status: 200,
            message: 'Đã show dữ liệu thành công',
            data: order
        }
    }catch(e) {

    }
}
export default {
    createOrderProductservices,
    getOrderDetail,
    getOrderDetailProduct
}