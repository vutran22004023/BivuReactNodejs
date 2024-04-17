import { createSlice } from "@reduxjs/toolkit";

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
  orderItemsSlected: [],
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
  paymentMethord: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    AddOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const index = state?.orderItems.findIndex(
        (item) => item.product === orderItem.product,
      );
      console.log(state?.orderItems);
      if (index !== -1) {
        state.orderItems[index].amount += orderItem.amount;
      } else {
        state.orderItems.push(orderItem);
      }
    },
    IncreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct,
      );
      const itemOrderSelected = state?.orderItemsSlected?.find(
        (item) => item?.product === idProduct,
      );
      itemOrder.amount++;
      if (itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    DecreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct,
      );
      const itemOrderSelected = state?.orderItemsSlected?.find(
        (item) => item?.product === idProduct,
      );
      itemOrder.amount--;
      if (itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },
    RemoveOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrders = state?.orderItems?.filter(
        (item) => !idProduct.includes(item?.product),
      );
      const itemOrdersSelected = state?.orderItems?.filter(
        (item) => !idProduct.includes(item?.product),
      );
      state.orderItems = itemOrders;
      state.orderItemsSlected = itemOrdersSelected;
    },
    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;

      const itemOrders = state?.orderItems?.filter(
        (item) => !listChecked.includes(item.product),
      );
      const itemOrdersSelected = state?.orderItems?.filter(
        (item) => !listChecked.includes(item.product),
      );
      state.orderItems = itemOrders;
      state.orderItemsSlected = itemOrdersSelected;
    },
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      const orderSelected = [];
      state.orderItems.forEach((order) => {
        if (listChecked.includes(order.product)) {
          orderSelected.push(order);
        }
      });
      state.orderItemsSlected = orderSelected;
    },
  },
});

export const {
  AddOrderProduct,
  IncreaseAmount,
  DecreaseAmount,
  RemoveOrderProduct,
  removeAllOrderProduct,
  selectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
