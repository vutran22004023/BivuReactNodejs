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
  const dispatch = useDispatch()

  useEffect(() =>{
    const {cookieData,decoded} = handleDecoded()
    if(decoded?.id) {
      handleGetDetailsUser(decoded?.id, cookieData);
    }
  },[])


  const handleDecoded = () => {
    let cookieData = document.cookie;

    let decoded = {};

    if (cookieData) {
        let cookieArr = cookieData.split(';');
        let accessTokenCookie = cookieArr.find(cookie => cookie.trim().startsWith('access_Token='));

        if (accessTokenCookie) {
            let accessTokenValue = accessTokenCookie.split('=')[1];
            decoded = jwtDecode(accessTokenValue);
        }
    }

    return { decoded, cookieData };
}

  UserService.axiosJWT.interceptors.request.use(async (config) =>{
    const currentTime = new Date()
    const {decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_Token}`
      console.log('data?.access_Token',data?.access_Token)
    }
    return config

  },(err) => {
    return Promise.reject(err)
  }
  )

  const handleGetDetailsUser = async (id, token) => {
    let accessTokenValue = token.split('=')[1];
    const res = await UserService.getDetailUser(id, accessTokenValue);
    dispatch(updateUser({...res?.data, access_Token: token}));
  }


  return (
    <>
      <HeaderHome />
      <Outlet />
    </>
  );
}
