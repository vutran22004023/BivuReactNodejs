import { OrderProductModel,ProductModel,DisCountModel,UserModel } from "../model/index.js";
import {Emailservicres} from './index.js'

const getAllOrderProduct = async (limit = 50, page =0) => {
    try {
        const totalOrderProduct = await OrderProductModel.countDocuments()
        const dataOrderProduct = await OrderProductModel.find().sort({ createdAt: -1 }).limit(limit).skip(page * limit);
        if(dataOrderProduct) {
            return {
                status: 200,
                message: "Xem tất cả sản phẩm",
                data: dataOrderProduct,
                total: totalOrderProduct,
                pageCurrent: Number(page),
                totalPage: Math.ceil(totalOrderProduct / limit)
            };
        }
    }catch (e){
        throw e;
    }
}

const createOrderProductservices = async (newOrder) => {
    try {
        const {orderItem,paymentMethod,itemsPrice,shippingPrice, totalPrice,fullName, address, city, phone,user,email,note_customers, voucher} =  newOrder

        // Check and update voucher if present
        if ( voucher?.discountId !== ''  ) {
            for (let i = 0; i < voucher.length; i++) {
                const discount = voucher[i];
                const discountData = await DisCountModel.findOneAndUpdate(
                    {
                        _id: discount.discountId,
                        quantity: { $gt: 0 } // Ensure there are vouchers left
                    },
                    {
                        $inc: {
                            quantity: -1,
                            selled: 1
                        }
                    },
                    {
                        new: true // Return the updated document
                    }
                );
            }
        }
        const promises = orderItem.map(async(order) => {
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
                oderItems: orderItem,
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
                user,
                voucher,
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


const getAllOrderProductDate = async(datestart,datesend) => {
    try {
        const checkOrderProductDate = await OrderProductModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: datestart,
                        $lte: datesend
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    totalOrders: { $sum: 1 },
                    totalDeliveredtrue: {
                        $sum: {
                            $cond: { if: { $eq: ["$isDelivered", true] }, then: 1, else: 0 }
                        }
                    },
                    totalDeliveredfalse: {
                        $sum: {
                            $cond: { if: { $eq: ["$isDelivered", false] }, then: 1, else: 0 }
                        }
                    },
                }
            },
            {
                $sort: { _id: 1 } // Sắp xếp theo ngày tăng dần
            }
        ]);

        const checkOrderProductDatePrice = await OrderProductModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: datestart,
                        $lte: datesend
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    totalAmountprice: {
                        $sum: {
                          $cond: { if: { $eq: ["$isDelivered", true] }, then: "$totalPrice", else: 0 }
                        }
                      },
                    totalDeliveredtrue: {
                        $sum: {
                            $cond: { if: { $eq: ["$isDelivered", true] }, then: 1, else: 0 }
                        }
                    },
                    totalDeliveredfalse: {
                        $sum: {
                            $cond: { if: { $eq: ["$isDelivered", false] }, then: 1, else: 0 }
                        }
                    },
                }
            },
            {
                $sort: { _id: 1 } // Sắp xếp theo ngày tăng dần
            }
        ]);

        return {
          status: 200,
          message: `Show dữ thành công`,
          data: checkOrderProductDate,
          dataOrderProductDate: checkOrderProductDatePrice
        };
      } catch (error) {
        throw error;
      }
}

const getDashboard = async() => {
    try {  
        const dataUserDashboard = await UserModel.find()
        const dataProductDashBoard = await ProductModel.find()
        const dataOrderProductDashBoard = await OrderProductModel.find()
        const topSellingProducts = await ProductModel.find()
            .sort({ selled: -1 })
            .limit(10)
            .select({ name: 1, selled: 1, _id: 0 });
        const dataorderProductTotalPrice = await OrderProductModel.aggregate([
            {
                $match: {
                    isDelivered: true
                }
            },
            {
                $group: {
                  _id: null,
                  totalAmountprice: { $sum: "$totalPrice" },
                }
              }
        ])
        const dataOrderProducttotalDelivered = await OrderProductModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalDeliveredtrue: {
                        $sum: {
                            $cond: { if: { $eq: ["$isDelivered", true] }, then: 1, else: 0 }
                        }
                    },
                    totalDeliveredfalse: {
                        $sum: {
                            $cond: { if: { $eq: ["$isDelivered", false] }, then: 1, else: 0 }
                        }
                    },
                }
            }
        ])


        return {
            status: 200,
            message: `Show dữ thành công`,
            dataDashboard: {
                dataUserlengh: dataUserDashboard.length,
                dataProductDashBoard: dataProductDashBoard.length,
                dataOrderProductDashBoard: dataOrderProductDashBoard.length
            }, 
            dataOrderProduct: dataorderProductTotalPrice,
            dataOrderProducttotalDelivered: dataOrderProducttotalDelivered,
            topSellingProducts: topSellingProducts
          };

    }catch (error) {
        throw error;
    }
}

const getAllOrderProductIsdeliveredfalse = async(limit = 50, page =0) => {
    try {
        const totalOrderProduct = await OrderProductModel.countDocuments()
        const dataOrderProduct = await OrderProductModel.find({isDelivered: false}).sort({ createdAt: -1 }).limit(limit).skip(page * limit);
        if(dataOrderProduct) {
            return {
                status: 200,
                message: "Xem tất cả sản phẩm",
                data: dataOrderProduct,
                total: totalOrderProduct,
                pageCurrent: Number(page),
                totalPage: Math.ceil(totalOrderProduct / limit)
            };
        }
    }catch (e){
        throw e;
    }
}


export default {
    createOrderProductservices,
    getOrderDetail,
    getOrderDetailProduct,
    getAllOrderProduct,
    updateOrderProduct,
    getAllOrderProductDate,
    getDashboard,
    getAllOrderProductIsdeliveredfalse
}