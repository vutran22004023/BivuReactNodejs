import React, {useState ,Suspense, useEffect } from "react";
import { createBrowserRouter, Outlet, useNavigate, useLocation, useNavigation  } from "react-router-dom";
import ProductHome from "../pages/HomePage/ContentHome/ProductHome/ProductHome";
import { isJsonString } from "../utils";
import { jwtDecode } from "jwt-decode";
import { UserService, PaymentService, OrderProduct,InformationPageService } from "../services/index.js";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/Slides/userSlide";
import IsLoadingComponent from "../components/LoadComponent/LoadingTotal.jsx";
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {txtDB} from "../Firebase/config.jsx"
import {useMutationHooks} from '../hooks/UseMutationHook.js'
import {deletedataOrderProduct} from '../redux/Slides/payorderProductSlide.js'
import {useQuery} from '@tanstack/react-query'
import { updateInformationPage } from "../redux/Slides/InformationPageSlide";
export const PrivateUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const fetchInformationAll = async () => {
      const res = await InformationPageService.getAllInforPage();
      return res; 
    }
    const { data: dataInfor, isLoading: isLoadingDataInfor } = useQuery({ queryKey: ['dataInformationPage'], queryFn: fetchInformationAll});

    useEffect(()=> {
      dispatch(updateInformationPage({...dataInfor?.data[0], isLoading:isLoadingDataInfor }));
    },[dataInfor])
    useEffect(() => {
      const { cookieData, decoded,accessTokenCookie } = handleDecoded();
      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, accessTokenCookie,decoded?.isAdmin);
      }
    }, []);

    useEffect(() => {
      const setUserInDb = async () => {
        try { 
          await setDoc(
            doc(txtDB, 'users',String(user.id)),
            {
              email: user?.email,
              lastSeen: serverTimestamp(),
              photoUrl: user?.avatar,
            },
            {merge: true}
          )
        } catch (err) {
          console.log(err)
        }
      }
      if(user) {
        setUserInDb()
      }
    },[user])
  
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
        return { decoded, cookieData,accessTokenCookie };
      }
  
    };
  
    UserService.axiosJWT.interceptors.request.use(
      async (config) => {
        const currentTime = new Date();
        const { decoded, cookieData } = handleDecoded();
        const access_Token = cookieData.split('=')[1];
        if (decoded?.exp < currentTime.getTime() / 1000) {
          try {
            const data = await UserService.refreshToken(access_Token, decoded?.id);
            if (data?.access_token) {
              config.headers['authorization'] = `Bearer ${data.access_token}`;
              document.cookie = `access_Token=${data.access_token}`;
            }
          } catch (err) {
          }
        }
        return config;
      },
      (err) => {
      }
    );
  
    const handleGetDetailsUser = async (id, token, isAdmin) => {
      let accessTokenValue = token.split("=")[1];
      const res = await UserService.getDetailUser(id, accessTokenValue, isAdmin);
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

  export const PrivateRouteUser = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    if(!user?.id || !user?.access_Token) {
      navigate("/"); // Điều hướng người dùng trở lại trang chủ
      return null; // Trả về null để không render gì cả
    }else if (user?.id || user?.access_Token) {
      return (
        <Suspense fallback={<IsLoadingComponent></IsLoadingComponent>}>
          <Outlet />
        </Suspense>
      );
    }
  }


  export const PrivateStatusOrderPay = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const pay = useSelector((state) => state.payorderproduct);
    console.log(pay);
    useEffect(() => {
      if(pay?.paymentMethod === "Thanh toán khi nhận hàng") {
        mutationOrderProduct.mutate(pay)
      }
    },[pay])
    const useQuery =() => {
      return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
  const apptransid = query.get('apptransid');
  const orderCode = query.get('orderCode');
  const mutationOrderStatus = useMutationHooks (async(apptransid) => {
      const res = await PaymentService.orderStatusZaloPay(apptransid)
      return res
  })
  const mutationOrderProduct = useMutationHooks((data) => {
    const { ...rests } = data;
    const access_Token = user.access_Token.split("=")[1];
    const res = OrderProduct.createOrderProduct(access_Token, data);
    return res;
  });


  const mutationCheckOrderProductPayOs = useMutationHooks (async(orderCode) => {
    const res = await PaymentService.CheckOrderProductPayOs(orderCode)
    return res
  })

  const mutationsUpdateOrder = useMutationHooks(async(id) => {
    const access_Token = user.access_Token.split("=")[1];
    const res = await OrderProduct.updateOrderProduct(id,{isPaid: true},access_Token)
    return res
  })

  const {data: dataOrderStatus, isLoading: isLoadingDataOrderStatus} = mutationOrderStatus
  const {data: dataOrderProductCreate, isLoading: isLoadingProductCreate} =mutationOrderProduct
  const {data: dataCheckOrderStatusPayOs, isLoading: isLoadingCheckOrderStatusPayOs} = mutationCheckOrderProductPayOs
  const {data: dataUpdateOrderProduct, isLoading: isLoadingUpdateOrderProduct} = mutationsUpdateOrder
  useEffect(() => {
    if(dataOrderProductCreate) {
      if(dataOrderProductCreate?.status === 200) {
        mutationsUpdateOrder.mutate(dataOrderProductCreate?.successResults[0]?.data?._id)
      }
    }
  }, [dataOrderProductCreate])

  useEffect(() => {
    if(dataUpdateOrderProduct?.status === 200) {
      navigate('/trang-thai/mua-hang/thanh-cong');
      dispatch(deletedataOrderProduct())
      // window.location.reload();
    }
  },[dataUpdateOrderProduct])
  


  useEffect (() => {
    if(dataCheckOrderStatusPayOs?.status === "PAID") {
      mutationOrderProduct.mutate(pay)
    }else if(dataCheckOrderStatusPayOs?.status === "CANCELLED") {
      dispatch(deletedataOrderProduct())
      navigate('/trang-thai/mua-hang/that-bai');
      window.location.reload();
    }
  }, [dataCheckOrderStatusPayOs])
  useEffect(() => {
    if(apptransid) {
      mutationOrderStatus.mutate(apptransid)
    }
  },[apptransid])

  useEffect(() => {
    if(orderCode) {
      mutationCheckOrderProductPayOs.mutate(orderCode)
    }
  },[orderCode])

  useEffect(() => {
    if(dataOrderStatus?.returncode === 1) {
      mutationOrderProduct.mutate(pay)
    }else if(dataOrderStatus?.returncode === -49) {
      dispatch(deletedataOrderProduct())
      navigate('/trang-thai/mua-hang/that-bai');
      window.location.reload();
    }
  },[dataOrderStatus])
  return (
    <>
    {isLoadingDataOrderStatus ||isLoadingCheckOrderStatusPayOs ||isLoadingProductCreate || isLoadingUpdateOrderProduct ? (
      <IsLoadingComponent ></IsLoadingComponent>
    ): (
      <Outlet />
    )
    }
    </>
  )
  }