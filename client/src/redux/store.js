import {configureStore} from '@reduxjs/toolkit'
import userReducer  from './Slides/userSlide.js'

export const store = configureStore({
    reducer: {
        user:userReducer
    }
})