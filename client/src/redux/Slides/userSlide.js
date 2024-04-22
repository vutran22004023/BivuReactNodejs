import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  access_Token: "",
  phone: "",
  address: "",
  avatar: "",
  isAdmin: false,
  city: "",
  district: "",
  rard: "",
  nameCity: "",
  nameDistrict: "",
  nameRard: "",
  specific_address: "",
};

export const createSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = "",
        email = "",
        access_Token = "",
        address = "",
        avatar = "",
        phone = "",
        _id = "",
        isAdmin,
        city = "",
        district = "",
        rard = "",
        nameCity = "",
        nameDistrict = "",
        nameRard = "",
        specific_address = "",
      } = action.payload;
      state.name = name;
      state.email = email;
      state.address = address;
      state.avatar = avatar;
      state.phone = phone;
      state.access_Token = access_Token;
      state.id = _id;
      state.isAdmin = isAdmin;
      state.city = city;
      state.district = district;
      state.rard = rard;
      state.nameCity = nameCity;
      state.nameDistrict = nameDistrict;
      state.nameRard = nameRard;
      state.specific_address = specific_address;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      (state.access_Token = ""), (state.address = "");
      state.avatar = "";
      state.phone = "";
      state.isAdmin = false;
      state.city = "";
      state.district = "";
      state.rard = "";
      state.nameCity = "";
      state.nameDistrict = "";
      state.nameRard = "";
      state.specific_address = "";
    },
  },
});

export const { updateUser, resetUser } = createSlices.actions;

export default createSlices.reducer;
