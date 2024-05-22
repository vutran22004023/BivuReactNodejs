import { OrderProductModel,ProductModel } from "../model/index.js";
import {Emailservicres} from './index.js'

const getAllOrderProduct = async () => {
    try {
        const dataOrderProduct = await OrderProductModel.find().sort({ createdAt: -1 });
        if(dataOrderProduct) {
            return {
                status: 200,
                message: "Xem tất cả sản phẩm",
                data: dataOrderProduct,
                // total: totalProduct,
                // pageCurrent: Number(page),
                // totalPage: Math.ceil(totalProduct / limit)
            };
        }
    }catch (e){
        throw e;
    }
}

const createOrderProductservices = async (newOrder) => {
    try {
        const {oderItem,paymentMethod,itemsPrice,shippingPrice, totalPrice,fullName, address, city, phone,user,email,note_customers} =  newOrder
        const promises = oderItem.map(async(order) => {
            const productData = await ProductModel.findOneAndUpdate(
                {
                    name: order.name,
                    'categorySize.counInStock': { $gte: order.amount } 
                },
                {
                    $inc: {
                        "categorySize.$[elem].counInStock": -order.amount,
                        selled: +order.amount 
                    }
                },
                { 
                    arrayFilters: [{ "elem.size": order.category }],
                    new: true // Trả về document sau khi cập nhật
                }
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
                note_customers,
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
const updateOrderProduct = async(id,data) => {
      
    try {
        const checkProduct = await OrderProductModel.findOne({
          _id: id,
        });
        if(!checkProduct) {
          return {
            status: "ERR",
            message: "Id không tồn tại",
          };
        }
        const updateProduct = await OrderProductModel.findByIdAndUpdate(id, data,{ new: true })
        return {
          status: 200,
          message: `Cập nhập thành công id : ${updateProduct._id}`,
          data: {
            ...updateProduct._doc,
          }
    
        };
      } catch (error) {
        throw error;
      }
}
export default {
    createOrderProductservices,
    getOrderDetail,
    getOrderDetailProduct,
    getAllOrderProduct,
    updateOrderProduct
}