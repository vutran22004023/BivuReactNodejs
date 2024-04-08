import React, {Suspense, useEffect } from "react";
import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom";
// import HomePage from "../pages/HomePage";
import ProductHome from "../pages/HomePage/ContentHome/ProductHome/ProductHome";
// import CategoryHome from "../pages/HomePage/ContentHome/CategoryHome/CategoryHome";
// import DetailProduct from "../pages/HomePage/ContentHome/DetailsProduct/DetailProduct.jsx";
// import ProFileUser from "../pages/HomePage/ContentHome/ProfileUserHome/ProFileUser";
// import AdminPage from "../pages/AdminPage/index";
import { isJsonString } from "../utils";
import { jwtDecode } from "jwt-decode";
import { UserService } from "../services/index.js";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/Slides/userSlide";
// import OderAdmin from "../pages/AdminPage/ContentAdmin/ProductAdmin/ProductAdmin";
// import UserAdmin from "../pages/AdminPage/ContentAdmin/UserAdmin/UserAdmin";
import IsLoadingComponent from "../components/LoadComponent/Loading.jsx";


//sử dụng Code Splitting

const HomePage = React.lazy(() => import("../pages/HomePage"));
// const ProductHome = React.lazy(() =>
//   import("../pages/HomePage/ContentHome/ProductHome/ProductHome")
// );
const CategoryHome = React.lazy(() =>
  import("../pages/HomePage/ContentHome/ProductHome/ProductHome")
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




const PrivateUser = () => {
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

const PrivateRouteAdmin = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  if (user?.isAdmin === true || user?.access_Token) {
    return (
      <Suspense fallback={<IsLoadingComponent></IsLoadingComponent>}>
        <Outlet />
      </Suspense>
    );
  } else if (user?.isAdmin === false || user?.access_Token === "") {
    return navigate("/");
  }
};

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
            path: "/danh-muc",
          },
          {
            element: <DetailProduct />,
            path: "/chi-tiet/:id",
          },
          {
            element: <ProFileUser />,
            path: "/profile-user",
          },
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
