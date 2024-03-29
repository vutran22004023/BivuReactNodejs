import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    access_Token:'',
}

export const createSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser:(state, action) => {
            const {name, email, access_Token} = action.payload
            state.name= name||email;
            state.email=email;
            state.access_Token=access_Token
        },
        resetUser:(state) => {
            state.name= '';
            state.email='';
            state.access_Token=''
        }
    }
})

export const {updateUser,resetUser} =createSlices.actions

export default createSlices.reducer