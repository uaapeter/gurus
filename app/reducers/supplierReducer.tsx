import { createSlice } from "@reduxjs/toolkit";

type supplierType = {
    supplier: {
        selected:any
    }
}
const initialState = {
    selected: null,
}

const supplerSlice = createSlice({
    name:'supplier',
    initialState,
    reducers: {
        setSelectedSupplier: (state, action) => {
            state.selected = action.payload
        },

      
    }
    
}) 


export const { setSelectedSupplier } = supplerSlice.actions

export const selectSelectedSupplier = (state:supplierType) => state.supplier.selected

export default supplerSlice.reducer