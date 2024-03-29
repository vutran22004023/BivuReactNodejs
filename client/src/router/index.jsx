import { createBrowserRouter,Outlet } from "react-router-dom";
import HomePage from '../pages/HomePage'
import ProductHome from '../pages/HomePage/ContentHome/ProductHome/ProductHome'
import CategoryHome from '../pages/HomePage/ContentHome/CategoryHome/CategoryHome'
import DetailProduct from './../pages/HomePage/ContentHome/DetailsProduct/DetailProduct';
import SignIn from "../pages/LoginPage/SignIn";
import SignUp from '../pages/LoginPage/SignUp'
import { useEffect } from "react";
import axios from 'axios'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

const AuthorLayout = () => {

    return <Outlet />
}




export default createBrowserRouter (
    [
        {
            element: <AuthorLayout />,
            children: [
                {
                    element: <HomePage/>,
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
                    ]
                },
            ]
        },
        {
            element: <SignIn />,
            path: "/login",
        },
        {
            element: <SignUp />,
            path: "/register",
        }
    ]
)