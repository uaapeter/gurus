import { createSlice } from "@reduxjs/toolkit";

type locationType = {
    location: {
        selected:any
    }
}
const initialState = {
    selected: null,
}

const locationSlice = createSlice({
    name:'location',
    initialState,
    reducers: {
        setSelectedLocation: (state, action) => {
            state.selected = action.payload
        }
    }
    
}) 


export const { setSelectedLocation } = locationSlice.actions

export const selectSelectedLocation = (state:locationType) => state.location.selected

export default locationSlice.reducer