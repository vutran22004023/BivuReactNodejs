import React, {Suspense, useEffect } from "react";
import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom";
import ProductHome from "../pages/HomePage/ContentHome/ProductHome/ProductHome";
import { isJsonString } from "../utils";
import { jwtDecode } from "jwt-decode";
import { UserService } from "../services/index.js";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/Slides/userSlide";
import IsLoadingComponent from "../components/LoadComponent/Loading.jsx";
export const PrivateUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
      const { cookieData, decoded } = handleDecoded();
      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, cookieData);
      }
    }, []);
  
    const handleDecoded = () => {
      let cookieData = document.cookie;
  
      let decoded = {};
  
      if (cookieData) {
        let cookieArr = cookieData.split(";");
        let accessTokenCookie = cookieArr.find((cookie) =>
          cookie.trim().startsWith("access_Token=")
        );
        if (accessTokenCookie) {
          let accessTokenValue = accessTokenCookie.split("=")[1];
          decoded = jwtDecode(accessTokenValue);
        }
      }
  
      return { decoded, cookieData };
    };
  
    UserService.axiosJWT.interceptors.request.use(
      async (config) => {
        const currentTime = new Date();
        const { decoded } = handleDecoded();
        if (decoded?.exp < currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken();
          config.headers["token"] = `Bearer ${data?.access_Token}`;
          console.log("data?.access_Token", data?.access_Token);
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  
    const handleGetDetailsUser = async (id, token) => {
      let accessTokenValue = token.split("=")[1];
      const res = await UserService.getDetailUser(id, accessTokenValue);
      dispatch(updateUser({ ...res?.data, access_Token: token }));
    };
    return (
      <Suspense fallback={<IsLoadingComponent></IsLoadingComponent>}>
        <Outlet />
      </Suspense>
    );
  };
  
  export const PrivateRouteAdmin = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    if (user?.isAdmin === true ) {
      return (
        <Suspense fallback={<IsLoadingComponent></IsLoadingComponent>}>
          <Outlet />
        </Suspense>
      );
    } else if (user?.isAdmin === false || !user?.id) {
      navigate("/"); // Điều hướng người dùng trở lại trang chủ
      return null; // Trả về null để không render gì cả
    }
  };
  
  export const PrivateRoutePay = () => {
    const navigate = useNavigate();
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    if(!user?.id || !order?.orderItemsSlected?.length) {
      navigate("/"); // Điều hướng người dùng trở lại trang chủ
      return null; // Trả về null để không render gì cả
    }else if (user?.id) {
      return (
        <Suspense fallback={<IsLoadingComponent></IsLoadingComponent>}>
          <Outlet />
        </Suspense>
      );
    }
  }