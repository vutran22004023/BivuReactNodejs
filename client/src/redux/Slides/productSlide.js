import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: '',
    dataSearch: {},
    isLoadingData: [],
    isLoadingDebounce: [],
    isInputEmpty: [],
}

export const productSlide = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        SearchProduct:(state, action) => {
            state.search= action.payload
        },
        DataSearchProduct:(state, action) => {
            state.dataSearch= action.payload;
            
        },
        IsloadingSearchProduct:(state, action) => {
            state.isLoadingData= action.payload;
        },
        IsloadingSearchProductFebounce:(state, action) => {
            state.isLoadingDebounce= action.payload;
        },
        SearchisInputEmpty:(state, action) => {
            state.isInputEmpty= action.payload;
        },        

        // resetUser:(state) => {
        //     state.name= '';
        //     state.email='';
        //     state.access_Token='',
        //     state.address='';
        //     state.avatar='';
        //     state.phone='';
        //     state.isAdmin= false;
        // }
    }
})

export const {SearchProduct,DataSearchProduct,IsloadingSearchProduct,IsloadingSearchProductFebounce,SearchisInputEmpty} =productSlide.actions

export default productSlide.reducer