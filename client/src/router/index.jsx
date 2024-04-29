import React   from "react";
import { createBrowserRouter } from "react-router-dom";
//Private
import {
  PrivateUser,
  PrivateRouteAdmin,
  PrivateRoutePay} from './private.jsx'
// import ProductHome from "../pages/HomePage/ContentHome/ProductHome/ProductHome";
import "../index.css";
//sử dụng Code Splitting
const ProductHome = React.lazy(() => import("../pages/HomePage/ContentHome/ProductHome/ProductHome"))
const HomePage = React.lazy(() => import("../pages/HomePage/index.jsx"));
const CategoryHome = React.lazy(() =>
  import("../pages/HomePage/ContentHome/CategoryHome/CategoryHome.jsx")
);
const DetailProduct = React.lazy(() =>
  import("../pages/HomePage/ContentHome/DetailsProduct/DetailProduct.jsx")
);
const ProFileUser = React.lazy(() =>
  import("../pages/HomePage/ContentHome/ProfileUserHome/ProFileUser")
);
const AdminPage = React.lazy(() => import("../pages/AdminPage/index"));
const OderAdmin = React.lazy(() =>
  import("../pages/AdminPage/ContentAdmin/ProductAdmin/ProductAdmin")
);
const UserAdmin = React.lazy(() =>
  import("../pages/AdminPage/ContentAdmin/UserAdmin/UserAdmin")
);

const CartProduct = React.lazy(() =>
  import("../pages/HomePage/ContentHome/CartProduct/CartProduct.jsx")
);

const PayProduct = React.lazy(() =>
  import("../pages/HomePage/ContentHome/PayProduct/PayProduct.jsx")
);

const OrderDetail = React.lazy(() =>
  import("../pages/HomePage/ContentHome/OrderDetail/OrderDetail.jsx")
);

export default createBrowserRouter([
  {
    element: <PrivateUser />,
    path: "/",
    children: [
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
            path: "/danh-muc/:typename",
          },
          {
            element: <DetailProduct />,
            path: "/chi-tiet/:id",
          },
          {
            element: <ProFileUser />,
            path: "/profile-user",
          },

          {
            element: <CartProduct />,
            path: "/gio-hang",
          },
          {
            element: <PrivateRoutePay/>,
            path: "/mua-hang",
            children: [
              {
                element: <PayProduct />,
                path: "/mua-hang",
              },
            ],
          },
          {
            element: <OrderDetail/>,
            path: '/don-hang'
          }
        ],
      },
      {
        element: <PrivateRouteAdmin />,
        path: "/admin",
        children: [
          {
            element: <AdminPage />,
            path: "/admin",
            children: [
              {
                element: <OderAdmin />,
                path: "san-pham",
              },
              {
                element: <UserAdmin />,
                path: "nguoi-dung",
              },
            ],
          },
        ],
      },
    ],
  },
]);
