import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductHome from "../pages/HomePage/ContentHome/ProductHome/ProductHome";
import CategoryHome from "../pages/HomePage/ContentHome/CategoryHome/CategoryHome";
import DetailProduct from "./../pages/HomePage/ContentHome/DetailsProduct/DetailProduct";
import ProFileUser from "../pages/HomePage/ContentHome/ProfileUserHome/ProFileUser";
import SignIn from "../pages/LoginPage/SignIn";
import SignUp from "../pages/LoginPage/SignUp";
import AdminPage from '../pages/AdminPage/index';

export default createBrowserRouter([
  {
    element: <HomePage />,
    path: "/",
    children: [
      {
        element: <ProductHome />,
        path: "/",
      },
      {
        element: <CategoryHome />,
        path: "/danh-muc",
      },
      {
        element: <DetailProduct />,
        path: "/chi-tiet",
      },
      {
        element: <ProFileUser />,
        path: "/profile-user",
      },
    ],
  },
  {
    element: <AdminPage />,
    path: '/admin',
    children: [
        {
            
        }
    ]
  },

  {
    element: <SignIn />,
    path: "/login",
  },
  {
    element: <SignUp />,
    path: "/register",
  },

]);
