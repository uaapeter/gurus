import { createSlice } from "@reduxjs/toolkit";
import { uiStateProps } from "../appTypes";


const initialState = {
    isOpen: false,
    error: null,
    success: null,
    isLoading: false,
    search: '',
    accountTab: false
}

const uiSlice = createSlice({
    name:'ui',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        },

        setSuccess: (state, action) => {
            state.success = action.payload
        },

        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
        setAccountTab: (state, action) => {
            state.accountTab = action.payload
        }
    }
    
}) 


export const { setError, setSuccess, setSearch, setIsOpen, setIsLoading } = uiSlice.actions

export const selectError = (state:uiStateProps) => state.ui.error
export const selectIsOpen = (state:uiStateProps) => state.ui.isOpen

export const selectSuccess = (state: uiStateProps) => state.ui.success
export const selectIsLoading = (state: uiStateProps) => state.ui.isLoading
export const selectAccounTab = (state:uiStateProps) => state.ui.accountTab

export const selectSearch = (state: uiStateProps) => state.ui.search

export default uiSlice.reducer