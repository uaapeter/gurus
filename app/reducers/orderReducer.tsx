import { createSlice } from "@reduxjs/toolkit";

type storeType = {
    order: {
        selected:any
    }
}
const initialState = {
    selected: null,
}

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers: {
        setSelectedOrder: (state, action) => {
            state.selected = action.payload
        },
    }
    
}) 


export const { setSelectedOrder } = orderSlice.actions

export const selectSelectedOrder = (state:storeType) => state.order.selected

export default orderSlice.reducer