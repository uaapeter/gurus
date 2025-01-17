import { createSlice } from "@reduxjs/toolkit";

type categoryType = {
    category: {
        selected:any
    }
}
const initialState = {
    selected: null,
}

const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selected = action.payload
        }
    }
    
}) 


export const { setSelectedCategory } = categorySlice.actions

export const selectSelectedCategory = (state:categoryType) => state.category.selected

export default categorySlice.reducer