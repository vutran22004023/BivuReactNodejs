import {configureStore} from '@reduxjs/toolkit'
import userReducer  from './Slides/userSlide.js'
import productReducer from './Slides/productSlide.js'
import orderReducer from './Slides/orderProductSlide.js'

export const store = configureStore({
    reducer: {
        user:userReducer,
        product:productReducer,
        order: orderReducer,
    }
})