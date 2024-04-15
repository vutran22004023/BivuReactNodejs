import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer  from './Slides/userSlide.js'
import productReducer from './Slides/productSlide.js'
import orderReducer from './Slides/orderProductSlide.js'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['product', 'user']
  }
  const rootReducer = combineReducers({
    user:userReducer,
    product:productReducer,
    order: orderReducer,
})
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export let persistor = persistStore(store)

