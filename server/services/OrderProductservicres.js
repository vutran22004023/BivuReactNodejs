import { OrderProductModel } from "../model/index.js";

const createOrderProductservices = async (newOrder) => {
    try {
        const {oderItem,paymentMethod,itemsPrice,shippingPrice, totalPrice,fullName, address, city, phone,user} =  newOrder
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
            return {
                status: 200,
                message: "Thêm sản phẩm thành công",
                data: {
                  ...createProduct._doc,
                },
        }
    }}catch(e) {
        console.log(e)
    }
}


export default {
    createOrderProductservices
}