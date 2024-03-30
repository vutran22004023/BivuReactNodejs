import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: '',
    name: '',
    email: '',
    access_Token:'',
    phone: '',
    address: '',
    avatar: '',
}

export const createSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser:(state, action) => {
            const {name ='', email='', access_Token='',address='',avatar='',phone='', _id =''} = action.payload
            state.name= name;
            state.email=email;
            state.address=address;
            state.avatar=avatar;
            state.phone=phone;
            state.access_Token=access_Token,
            state.id=_id;
        },
        resetUser:(state) => {
            state.name= '';
            state.email='';
            state.access_Token='',
            state.address='';
            state.avatar='';
            state.phone='';
        }
    }
})

export const {updateUser,resetUser} =createSlices.actions

export default createSlices.reducer