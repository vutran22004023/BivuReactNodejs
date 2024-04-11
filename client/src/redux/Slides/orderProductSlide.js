import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [
        // {
        //     name: {
        //         type: String,
        //         required: true,
        //     },
        //     amount: {
        //         type: Number,
        //         required: true,
        //     },
        //     image: {
        //         type: String,
        //         required: true,
        //     },
        //     product: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref:'Product',
        //         required: true,
        //     }
        // }
    ],
    shippingAddress: {
        // fullName: {
        //     type: String,
        //     required: true,
        // },
        // address: {
        //     type: String,
        //     required: true,
        // },
        // city: {
        //     type: String,
        //     required: true,
        // },
        // country: {
        //     type: String,
        //     required: true,
        // },
        // phone: {
        //     type: Number,
        //     required: true,
        // }
    },
    paymentMethord: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        AddOrderProduct:(state, action) => {
            const {orderItem} = action.payload
            const index = state.orderItems.findIndex(item => item.product === orderItem.product)
            console.log(state?.orderItems)
            if(index !== -1) {
                state.orderItems[index].amount += orderItem.amount
            } else {
                state.orderItems.push(orderItem)
            }
        },
        RemoveOrderProduct:(state, action) => {
            const { idProduct } = action.payload
            const index = state.orderItems.findIndex(item => item.product === idProduct)
            if(index !== -1) {
                state.orderItems.splice(index, 1)
            }
        },
    }
})

export const {AddOrderProduct} =orderSlice.actions

export default orderSlice.reducer