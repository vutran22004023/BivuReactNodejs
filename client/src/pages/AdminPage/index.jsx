import React from 'react'
import { Outlet } from "react-router-dom";
export default function index() {
  return (
    <>  
        <div>helo</div>
        <Outlet/>
    </>
  )
}
