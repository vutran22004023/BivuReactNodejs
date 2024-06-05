import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItem: [],
  fullName: '',
  address: '',
  phone: '',
  city: '',
  email: '',
  paymentMethod: '',
  itemsPrice: '',
  shippingPrice: '',
  totalPrice: '',
  user: '',
  note_customers: '',
  voucher: []
};

export const createSlices = createSlice({
  name: 'payOrderProducts',
  initialState,
  reducers: {
    datapayOrderProduct: (state, action) => {
      const {
        orderItem = [], fullName= '', address = '', phone= '', city= '', email= '', paymentMethod= '',
        itemsPrice= '', shippingPrice= '', totalPrice= '', user= '', note_customers= '', voucher= []
      } = action.payload;

      state.orderItem = orderItem ;
      state.fullName = fullName ;
      state.address = address ;
      state.phone = phone ;
      state.city = city ;
      state.email = email ;
      state.paymentMethod = paymentMethod ;
      state.itemsPrice = itemsPrice ;
      state.shippingPrice = shippingPrice ;
      state.totalPrice = totalPrice ;
      state.user = user ;
      state.note_customers = note_customers ;
      state.voucher = voucher ;
    },
    deletedataOrderProduct: (state, action) => {
      state.orderItem = [] ;
      state.fullName = "" ;
      state.address = "" ;
      state.phone = "" ;
      state.city = "" ;
      state.email = "" ;
      state.paymentMethod = "" ;
      state.itemsPrice = "" ;
      state.shippingPrice = "" ;
      state.totalPrice = "" ;
      state.user = "" ;
      state.note_customers = "" ;
      state.voucher = [] ;
    },
  }
});

export const { datapayOrderProduct, deletedataOrderProduct } = createSlices.actions;

export default createSlices.reducer;