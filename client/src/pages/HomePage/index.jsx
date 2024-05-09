import React, { useEffect } from "react";
import HeaderHome from '../../components/IncludeHomeComponent/headerHome.jsx'
import '../../assets/font-end/css/Home.css'
import { Outlet } from "react-router-dom";
export default function index() {
  useEffect(() => {
    document.title = "Trang chủ"
  },[])
  return (
    <>
      <HeaderHome/>
      <Outlet />
    </>
  );
}
