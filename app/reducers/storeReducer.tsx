import { createSlice } from "@reduxjs/toolkit";

type storeType = {
    store: {
        selected:any
    }
}
const initialState = {
    selected: null,
}

const storeSlice = createSlice({
    name:'store',
    initialState,
    reducers: {
        setSelectedStore: (state, action) => {
            state.selected = action.payload
        },

      
    }
    
}) 


export const { setSelectedStore } = storeSlice.actions

export const selectSelectedStore = (state:storeType) => state.store.selected

export default storeSlice.reducer