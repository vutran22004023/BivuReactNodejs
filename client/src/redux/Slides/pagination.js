import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    page: [],
}

export const paginationSlices = createSlice({
    name: 'page',
    initialState,
    reducers: {
        paginationPage:(state, action) => {
            const {page= 0} = action.payload
            state.page= page;
        
    }
}})

export const {paginationPage} =paginationSlices.actions

export default paginationSlices.reducer