import { configureStore } from "@reduxjs/toolkit";
import uiReducer from '../reducers/uiReducer'
import storeReducer from '../reducers/storeReducer'
import userReducer from '../reducers/userReducer'
import supplierReducer from '../reducers/supplierReducer'
import categoryReducer from '../reducers/categoryReducer'
import productReducer from '../reducers/productReducer'
import orderReducer from '../reducers/orderReducer'
import locationReducer from '../reducers/locationReducer'






       
export const STORE = configureStore({
    reducer: {
       ui: uiReducer,
       store: storeReducer,
       users: userReducer,
       order: orderReducer,
       supplier: supplierReducer,
       category: categoryReducer,
       location: locationReducer,
       product: productReducer,

    }
})