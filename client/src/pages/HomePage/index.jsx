import React, { useEffect } from "react";
import HeaderHome from '../../components/IncludeHomeComponent/headerHome.jsx'
import '../../assets/font-end/css/Home.css'
import { Outlet } from "react-router-dom";
import { isJsonString } from "../../utils";
import { jwtDecode } from "jwt-decode";
import { UserService} from "../../services/index.js";
import { useDispatch } from 'react-redux'
import { updateUser } from "../../redux/Slides/userSlide";
import axios from "axios";
export default function index() {
  
  return (
    <>
      <HeaderHome />
      <Outlet />
    </>
  );
}
