import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    namePage:  '',
    description: '',
    logo_1: [],
    logo_2: [],
    image_slider: [],
    image_right: [],
    image_bottom: [],
    title_1 : '',
    title_2 : '',
    title_3 : '',
    title_4 : '',
    link_fb: '',
    link_tt: '',
    link_shoppee: '',
    image_qc_1: [],
    image_qc_2: [],
    image_qc_3: [],
    image_qc_4: [],
    image_qc_5: [],
    link_qc_1: '',
    link_qc_2: '',
    link_qc_3: '',
    link_qc_4: '',
    link_qc_5: '',
    type_Product: [],
    isLoading: '',
};

export const createSlices = createSlice({
  name: "InformationPage",
  initialState,
  reducers: {
    updateInformationPage: (state, action) => {
      const {
        namePage =  '',
        description = '',
        logo_1 = [],
        logo_2 = [],
        image_slider = [],
        image_right = [],
        image_bottom = [],
        title_1  = '',
        title_2  = '',
        title_3  = '',
        title_4  = '',
        link_fb = '',
        link_tt = '',
        link_shoppee = '',
        image_qc_1 = [],
        image_qc_2 = [],
        image_qc_3 = [],
        image_qc_4 = [],
        image_qc_5 = [],
        link_qc_1 = '',
        link_qc_2 = '',
        link_qc_3 = '',
        link_qc_4 = '',
        link_qc_5 = '',
        type_Product= [],
        isLoading = ''
      } = action.payload;
      state.namePage = namePage;
      state.description = description;
      state.logo_1 = logo_1;
      state.logo_2 = logo_2;
      state.image_slider = image_slider;
      state.image_right = image_right;
      state.image_bottom = image_bottom;
      state.title_1 = title_1;
      state.title_2 = title_2;
      state.title_3 = title_3;
      state.title_4 = title_4;
      state.link_fb = link_fb;
      state.link_tt = link_tt;
      state.link_shoppee = link_shoppee;
      state.image_qc_1 = image_qc_1;
      state.image_qc_2 = image_qc_2;
      state.image_qc_3 = image_qc_3;
      state.image_qc_4 = image_qc_4;
      state.image_qc_5 = image_qc_5;
      state.link_qc_1 = link_qc_1;
      state.link_qc_2 = link_qc_2;
      state.link_qc_3 = link_qc_3;
      state.link_qc_4 = link_qc_4;
      state.link_qc_5 = link_qc_5;
      state.type_Product = type_Product;
      state.isLoading = isLoading;
    },
  },
});

export const { updateInformationPage } = createSlices.actions;

export default createSlices.reducer;
