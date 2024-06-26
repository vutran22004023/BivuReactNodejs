import React   from "react";
import { createBrowserRouter } from "react-router-dom";
//Private
import {
  PrivateUser,
  PrivateRouteAdmin,
  PrivateRoutePay,
  PrivateRouteUser,
  PrivateStatusOrderPay} from './private.jsx'
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
const OrderProductDetails = React.lazy(() =>
  import("../pages/HomePage/ContentHome/OrderDetail/OrderProductDetail.jsx")
);

const InforPageAdmin = React.lazy(() =>
  import("../pages/AdminPage/ContentAdmin/InformationPageAdmin/InforPageAdmin.jsx")
);
const OrderProductAdmin = React.lazy(() =>
  import("../pages/AdminPage/ContentAdmin/OrderProductAdmin/OrderProduct.jsx")
)

const DashboardAdmin = React.lazy(() =>
  import("../pages/AdminPage/ContentAdmin/DashboardAdmin/DashBoard.jsx")
)

const DiscountAdmin = React.lazy(() =>
  import("../pages/AdminPage/ContentAdmin/DiscountAdmin/discount.jsx")
)
const PaySuccess = React.lazy(() =>
  import("../pages/HomePage/ContentHome/PayProduct/PaySuccess.jsx")
)
const PayError = React.lazy(() =>
  import("../pages/HomePage/ContentHome/PayProduct/PayError.jsx")
)

const StatisticalAdmin = React.lazy(() =>
  import("../pages/AdminPage/ContentAdmin/OrderProductAdmin/Statistical.jsx")
)

const OrderProductnNotBeenProcessedAdmin = React.lazy(() =>
  import("../pages/AdminPage/ContentAdmin/OrderProductAdmin/orderProductnNotBeenProcessed.jsx")
)






export default createBrowserRouter([
  {
    element: <PrivateUser />,
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
            path: "/chi-tiet/:id/:slug",
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
            children: [
              {
                element: <PayProduct />,
                path: "/mua-hang",
              },
              {
                element: <PrivateStatusOrderPay/>,
                path: "/trang-thai",
                children: [
                  {
                    element: <PaySuccess />,
                    path: "mua-hang/thanh-cong",
                  },
                  {
                    element: <PayError />,
                    path: "mua-hang/that-bai",
                  },
                ]
              }
            ],
          },
          {
            element: <PrivateRouteUser/>,
            children: [
              {
                element: <OrderDetail/>,
                path: '/don-hang/:id',
              },
              {
                element: <OrderProductDetails/>,
                path: '/chi-tiet-don-hang/:id' 
              }
            ]
          }
        ],
      },
      {
        element: <PrivateRouteAdmin />,
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
              {
                element: <InforPageAdmin />,
                path: "thong-tin",
              },
              {
                element: <OrderProductAdmin />,
                path: "don-hang",
              },
              {
                element: <DiscountAdmin />,
                path: "giam-gia",
              },
              {
                element: <DashboardAdmin />,
                path: "bang-dieu-kien",
              },
              {
                element: <StatisticalAdmin />,
                path: "thong-ke-don-hang",
              },
              {
                element: <OrderProductnNotBeenProcessedAdmin />,
                path: "don-hang-chua-xu-ly",
              },
            ],
          },
        ],
      },
    ],
  },
]);
