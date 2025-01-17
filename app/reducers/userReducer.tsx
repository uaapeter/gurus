import { createSlice } from "@reduxjs/toolkit";

type staffType = {
    users: {
        staff: any,
        users: any[]
        selected:any
    }
}
const initialState = {
    users: [],
    staff: null,
    selected: null,
}

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers: {

        setUsers: (state, action) => {
            state.users = action.payload
        },
        setSelectedUser: (state, action) => {
            state.selected = action.payload
        },

        setStaff: (state, action) => {
            state.staff = action.payload
        }
      
    }
    
}) 


export const { setUsers, setStaff, setSelectedUser } = userSlice.actions

export const selectUsers = (state:staffType) => state.users.users
export const selectStaff = (state:staffType) => state.users.staff
export const selectSelectedUser = (state:staffType) => state.users.selected

export default userSlice.reducer