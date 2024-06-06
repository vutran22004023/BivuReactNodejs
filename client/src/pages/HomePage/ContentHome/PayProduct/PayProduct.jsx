import React, { useState, useEffect, useMemo } from "react";
import ButtonComponent from "../../../../components/ButtonSearch/Button";
import { useSelector, useDispatch } from "react-redux";
import { convertPrice, formatDate } from "../../../../utils";
import ModalComponent from "../../../../components/ModalComponent/Modal";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import {
  ProvinceVn,
  UserService,
  OrderProduct,
  PaymentService,
  GhtkService,
  DiscountService,
} from "../../../../services/index";
import { useQuery } from "@tanstack/react-query";
import { useMutationHooks } from "../../../../hooks/UseMutationHook";
import {
  success,
  error,
  warning,
} from "../../../../components/MessageComponents/Message.jsx";
import IsLoadingComponent from "../../../../components/LoadComponent/Loading.jsx";
import { Steps, theme, Radio, Space, Input, Form } from "antd";
const { TextArea } = Input;
import GoogleMapComponent from "../../../../components/GoogleMapComponent/GoogleMap.jsx";
import { updateUser } from "../../../../redux/Slides/userSlide";
import SellIcon from "@mui/icons-material/Sell";
import IconVoucher from '../../../../assets/font-end/imgs/icon/iconVoucher.png';
import PlaceIcon from '@mui/icons-material/Place';
import {datapayOrderProduct} from '../../../../redux/Slides/payorderProductSlide.js' 
export default function PayProduct() {
  const [value, setValue] = useState(null);
  const [valueRadioShip, setValueRadioShip] = useState();
  const [valueRadioShipcomplete, setValueRadioShipcomplete] = useState();
  const [valueRadio, setValueRadio] = useState();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [SleectNamecity, setSleectNamecity] = useState("");
  const [SleectDistrict, setSleectDistrict] = useState("");
  const [SleectRard, setSleectRard] = useState("");
  const [isModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [isModalTransition, setIsOpenModalTransition] = useState(false);
  const [isModalVoucher, setIsModalVoucher] = useState(false);
  const [valueRadiovoucher, setValueRadiovoucher] = useState()
  const [valueVoucher, setValueVoucher] = useState();
  const [valueVouchermutation,setvalueVouchermutation] = useState();
  const handleButtonVoucher = () => {
    setIsModalVoucher(true);
  };
  const dispatch = useDispatch();
  const handleButtonTransport = () => {
    setIsOpenModalTransition(true);
  };
  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    rard: "",
    nameCity: "",
    nameDistrict: "",
    nameRard: "",
    specific_address: "",
    note_customers: "",
  });
  const handleOpenModal = () => {
    setIsOpenModalUpdateInfo(true);
    if (user) {
      setStateUserDetail({
        ...stateUserDetail,
        name: user?.name,
        phone: String(user.phone),
        address: user?.address,
        city: user?.city,
        district: user?.district,
        rard: user?.rard,
        nameCity: user?.nameCity,
        nameDistrict: user?.nameDistrict,
        nameRard: user?.nameRard,
        specific_address: user?.specific_address,
      });
    }
  };

  useEffect(() => {
    if (user) {
      setStateUserDetail({
        ...stateUserDetail,
        name: user?.name,
        phone: String(user.phone),
        address: user?.address,
        city: user?.city,
        district: user?.district,
        rard: user?.rard,
        nameCity: user?.nameCity,
        nameDistrict: user?.nameDistrict,
        nameRard: user?.nameRard,
        specific_address: user?.specific_address,
      });
    }
  }, [user]);

  const handleOnchangeDetails = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
      nameCity: SleectNamecity,
      nameDistrict: SleectDistrict,
      nameRard: SleectRard,
      specific_address: `${stateUserDetail?.address}, ${SleectRard}, ${SleectDistrict}, ${SleectNamecity}`,
    });
  };

  const handleButtonPay = () => {
    if (
      user?.access_Token &&
      order?.orderItemsSlected &&
      user?.name &&
      user?.specific_address &&
      user?.phone &&
      user?.city &&
      user?.id
    ) {

      dispatch(datapayOrderProduct({
        orderItem: order?.orderItemsSlected ,
        fullName: user?.name ,
        address: user?.specific_address ,
        phone: user?.phone ,
        city: user?.city ,
        email: user?.email ,
        paymentMethod: valueRadio ,
        itemsPrice: priceMemo ,
        shippingPrice: diliveryPriceMemo ,
        totalPrice: TotalpriceMemo ,
        user: user?.id ,
        note_customers: stateUserDetail.note_customers ,
        voucher: [{
          discountId: valueVouchermutation?.data?._id,
          namediscount: valueVouchermutation?.data?.name ,
          discountPercentdiscount: valueVouchermutation?.data?.discountPercent,
          discountAmountdiscount: valueVouchermutation?.data?.discountAmount,
        }]
      }));

      if (valueRadio === "Thanh toán khi nhận hàng") {
      } else if (valueRadio === "Thanh toán QR") {
        mutationPayQR.mutate({
          oderItem: order?.orderItemsSlected,
          fullName: user?.name,
          address: user?.specific_address,
          phone: user?.phone,
          city: user?.city,
          email: user?.email,
          paymentMethod: valueRadio,
          itemsPrice: priceMemo,
          shippingPrice: diliveryPriceMemo,
          totalPrice: TotalpriceMemo,
          user: user?.id,
        });
      } else if (valueRadio === "Thanh toán Zalopay") {
        mutationPayZaloPay.mutate({
          oderItem: order?.orderItemsSlected,
          fullName: user?.name,
          address: user?.specific_address,
          phone: user?.phone,
          city: user?.city,
          paymentMethod: valueRadio,
          itemsPrice: priceMemo,
          shippingPrice: diliveryPriceMemo,
          totalPrice: TotalpriceMemo,
          user: user?.id,
        });
      }
    }
  };

  const handleUpdateModal = () => {
    mutationUpdate.mutate(stateUserDetail);
  };

  const fetchProvincevn = async () => {
    const res = await ProvinceVn.apiGetAllCity();
    return res;
  };

  const fetchDetailDistrict = useMutationHooks(async (city) => {
    const res = await ProvinceVn.apiDetailAllDistrict(city);
    return res;
  });

  const fetchDetailRard = useMutationHooks(async (district) => {
    const res = await ProvinceVn.apiGetDetaiAllRard(district);
    return res;
  });

  const mutationUpdate = useMutationHooks((data) => {
    const { ...rests } = data;
    const access_Token = user.access_Token.split("=")[1];
    const id = user?.id;
    const res = UserService.updateUser(id, data, access_Token);
    return res;
  });
  const mutationOrderProduct = useMutationHooks((data) => {
    const { ...rests } = data;
    const access_Token = user.access_Token.split("=")[1];
    const res = OrderProduct.createOrderProduct(access_Token, data);
    return res;
  });

  const mutationsVoucherShop = useMutationHooks(() => {
    const res = DiscountService.getAllDiscount();
    return res;
  });

  const mutationsVoucherShopDetail = useMutationHooks((id) => {
    const res = DiscountService.getDetailDiscount(id);
    return res;
  });

  const mutationPayQR = useMutationHooks(async (data) => {
    try {
      const { ...rests } = data;
      const res = await PaymentService.createPaymentLink(data);
      // Kiểm tra xem API đã trả về thành công hay không
      return res;
    } catch (error) {
      console.error("Lỗi khi gọi API thanh toán:", error);
    }
  });



  const mutationPayZaloPay = useMutationHooks(async (data) => {
    try {
      const { ...rests } = data;
      const res = await PaymentService.createPaymentZaloPay(data);
      // Kiểm tra xem API đã trả về thành công hay không
      return res;
    } catch (error) {
      console.error("Lỗi khi gọi API thanh toán:", error);
    }
  });



  const mutationGHTKshippingfeecharged = useMutationHooks(async () => {
    const address = user?.address;
    const province = user?.nameCity;
    const district = user?.nameDistrict;
    const pick_province = "Đà Nẵng";
    const pick_district = "Quận Liên Chiểu";
    const value = priceMemo;
    const res = await GhtkService.shippingfeecharged(
      address,
      province,
      district,
      pick_province,
      pick_district,
      value,
    );
    return res;
  });

  useEffect(() => {
    mutationsVoucherShopDetail.mutate(valueVoucher)
  },[valueVoucher])
  useEffect(() => {
    mutationGHTKshippingfeecharged.mutate();
  }, [user?.address, user?.nameCity, user?.nameDistrict]);

  useEffect(() => {
    if (stateUserDetail?.city) {
      fetchDetailDistrict.mutate(stateUserDetail?.city);
    }
  }, [stateUserDetail?.city]);

  useEffect(() => {
    if (stateUserDetail?.district) {
      fetchDetailRard.mutate(stateUserDetail?.district);
    }
  }, [stateUserDetail?.district]);

  useEffect(() => {
    if (isModalVoucher === true) {
      mutationsVoucherShop.mutate();
    }
  }, [isModalVoucher]);

  const { data: getAllCity } = useQuery({
    queryKey: ["fetchProvincevn"],
    queryFn: fetchProvincevn,
  });
  const { data: getDetailAllDistrict } = fetchDetailDistrict;
  const { data: getDetailAllRard } = fetchDetailRard;
  const { data: showfeeShip } = mutationGHTKshippingfeecharged;
  const { data: UsersUpdateDetail, isLoading: isLoadingUpdateUserDetail } =
    mutationUpdate;
  const { data: orderProductPay, isLoading: isLoadingAddOrder } =
    mutationOrderProduct;
  const { data: payQR } = mutationPayQR;
  const { data: PayZalo } = mutationPayZaloPay;
  const { data: dataVoucher, isLoading: isLoadingVoucher } =
    mutationsVoucherShop;

  const {data: datavoucherdetail} = mutationsVoucherShopDetail

  useEffect(() => {
    if(datavoucherdetail) {
      setvalueVouchermutation(datavoucherdetail)
    }
  },[datavoucherdetail])
  useEffect(() => {
    if (payQR) {
      // Chuyển hướng người dùng đến URL được trả về từ API
      window.location.href = payQR.checkoutUrl;
    }
  }, [payQR]);
  useEffect(() => {
    if (PayZalo) {
      // Chuyển hướng người dùng đến URL được trả về từ API
      window.location.href = PayZalo.order_url;
    }
  }, [PayZalo]);

  useEffect(() => {
    if (orderProductPay?.status === 200) {
      success("Đặt hàng thành công");
    } else if (orderProductPay === "ERR") {
      error();
    }
  }, [orderProductPay]);

  useEffect(() => {
    if (UsersUpdateDetail?.status === 200) {
      success();
      dispatch(
        updateUser({
          ...UsersUpdateDetail?.data,
          access_Token: user?.access_Token,
        }),
      );
      setIsOpenModalUpdateInfo(false);
    } else if (UsersUpdateDetail?.status === "ERR") {
      error();
    }
  }, [UsersUpdateDetail?.status]);
  // lấy tên tỉnh thành
  useEffect(() => {
    if (stateUserDetail?.city) {
      const selectedCity = getAllCity?.results?.find(
        (item) => item.province_id === stateUserDetail.city,
      );
      if (selectedCity) {
        setSleectNamecity(selectedCity.province_name);
      }
    }
  }, [stateUserDetail?.city, getAllCity?.results]);

  // lấy tên của huyện
  useEffect(() => {
    if (stateUserDetail?.district) {
      const selectedDetailDistrict = getDetailAllDistrict?.results?.find(
        (item) => item.district_id === stateUserDetail?.district,
      );
      if (selectedDetailDistrict) {
        setSleectDistrict(selectedDetailDistrict.district_name);
      }
    }
  }, [stateUserDetail?.district, getDetailAllDistrict?.results]);

  useEffect(() => {
    if (stateUserDetail?.rard) {
      const selectedDetailRard = getDetailAllRard?.results?.find(
        (item) => item.ward_id === stateUserDetail?.rard,
      );
      if (selectedDetailRard) {
        setSleectRard(selectedDetailRard.ward_name);
      }
    }
  }, [stateUserDetail?.rard, getDetailAllRard?.results]);

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (valueRadioShip === "shop_giao") {
      return 15000;
    } else {
      return parseInt(valueRadioShip);
    }
    return 0;
  }, [valueRadioShip]);

  const TotalpriceMemo = useMemo(() => {
    if (valueVouchermutation) {
      const discountedPrice = priceMemo * (1 - valueVouchermutation?.data?.discountPercent / 100); // Giảm giá theo phần trăm
      return discountedPrice + diliveryPriceMemo;
    } else {
      return priceMemo + diliveryPriceMemo;
    }
  }, [priceMemo, diliveryPriceMemo, valueVouchermutation]);

  const onChange = (e) => {
    setValue(e.target.value);
  };



  useEffect(() => {
    if (value === 1) {
      setValueRadio("Thanh toán khi nhận hàng");
    } else if (value === 2) {
      setValueRadio("Thanh toán QR");
    } else if (value === 3) {
      setValueRadio("Thanh toán Zalopay");
    }
  }, [value]);
  const onchangeRadioShip = (e) => {
    setValueRadioShip(e.target.value);
  };

  const handleConfirmRadio = () => {
    setValueRadioShipcomplete(valueRadioShip);
    setIsOpenModalTransition(false);
  };
  const isVoucherActive = (startDate) => {
    const now = new Date();
    return new Date(startDate) <= now;
  };

  const getTimeUntilStart = (startDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const diff = start - now;
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
    return { days, hours, minutes, seconds };
  };

  const hasVoucherEnded = (endDate) => {
    const now = new Date();
    return new Date(endDate) < now;
  };


   const onChangeRadioVoucher = (e) => {
    setValueRadiovoucher(e.target.value)
   }

   const handleButtonOkVoucher = () => {
    setValueVoucher(valueRadiovoucher)
    setIsModalVoucher(false)
   }
  const steps = [
    {
      title: "Chi tiết thông tin đơn hàng",
      content: (
        <>
          <div className="bg-[#ebe6e6] p-5 md:p-10">
            <h2 className="mb-2 text-[18px] md:text-[25px] text-[#ee4d2d]"><span><PlaceIcon/></span> Địa chỉ nhận Hàng</h2>
            <div className="flex">
            {user?.name && user?.phone &&  user?.specific_address ? (
              <>
              <div className="text-[10px] md:text-[16px]"  style={{fontWeight:'600'}}>
                {" "}
                {user?.name} (+84){user?.phone} 
              </div>
              <div className="ml-2 text-[10px] md:text-[16px]">{user?.specific_address}</div>
              </>
            ): (
              <div className="text-[10px] md:text-[16px] text-[red]">Vui lòng cập nhập thông tin giao hàng</div>
            )}
              <span
                className="ml-1 md:ml-2 cursor-pointer text-[#2544a1] hover:text-[#3161f0]  text-[10px] md:text-[16px]"
                onClick={handleOpenModal}
              >
                {" "}
                Thay đổi
              </span>
            </div>
          </div>

          <div className="mt-5 w-full bg-[#ebe6e6] p-5 text-center md:p-10">
            <div className="flex justify-between">
              <div className="w-35 flex-auto text-left md:w-32">Sản phẩm</div>
              <div className="w-5 flex-auto"></div>
              <div className="flex">
                <div className="w-20 flex-auto md:w-40">Đơn giá</div>
                <div className="w-20 flex-auto md:w-40">Số Lượng</div>
                <div className="w-20 flex-auto text-right md:w-40 ">
                  Thành Tiền
                </div>
              </div>
            </div>
            {order?.orderItemsSlected?.map((item) => {
              return (
                <div className="mt-5 flex justify-between ">
                  <div className="flex">
                    <img src={item?.image} className="h-[70px] w-[70px]" />
                    <div className="w-35 flex-auto text-left md:w-32">
                      {item?.name}
                    </div>
                  </div>

                  <div className="w-5 flex-auto">
                    <div
                      className=""
                      style={{
                        display: item.category && item.color ? "block" : "none",
                      }}
                    >
                      <div>Phân Loại hàng</div>
                      <div>
                        {item.category}, {item.color}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-20 flex-auto md:w-40">
                      {convertPrice(item?.price)}
                    </div>
                    <div className="w-20 flex-auto md:w-40">{item?.amount}</div>
                    <div className="w-20 flex-auto text-right md:w-40 ">
                      {convertPrice(item?.price * item?.amount)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className=" flex border-[1px] border-slate-400 bg-[#ebe6e6]">
            <div className="w-[600px] border-[1px] border-slate-400 p-5">
              <Form>
                <Form.Item name="note_customers" label="Lời nhắn">
                  <TextArea
                    value={stateUserDetail.note_customers}
                    onChange={handleOnchangeDetails}
                    name="note_customers"
                    rows={3}
                    placeholder="Nhập lời nhắn với shop"
                  />
                </Form.Item>
              </Form>
            </div>
            <div className="w-full border-[1px] border-slate-400 p-5">
              {valueRadioShipcomplete === "shop_giao" ? (
                <div className="mr-4 flex justify-between">
                  <div className="text-[15px]">Đơn vị vận chuyển: </div>
                  <div>
                    <p>Được vận chuyển bởi shop</p>
                  </div>
                  <div
                    onClick={handleButtonTransport}
                    className="cursor-pointer text-[#2544a1] hover:text-[#3161f0]"
                  >
                    Thay đổi
                  </div>
                  <div>{convertPrice(diliveryPriceMemo)}</div>
                </div>
              ) : (
                <div className="mr-4 flex justify-between">
                  <div className="text-[15px]">Đơn vị vận chuyển: </div>
                  <div>
                    <p>Tiêu chuẩn</p>
                    <p>Giao hàng tiết kiệm</p>
                    <div>
                      Lưu ý:{" "}
                      <span>
                        Tiền ship được tính theo Kg hiện tại sản phẩm của shop
                        chưa cập nhập khối lượng của sản phẩm nên shop để mặc
                        định 1kg(0,5kg tiếp theo = +5.000),sau khi các bạn mua
                        sản phẩm của shop sẽ liên hệ lại bạn để báo giá tiền
                        ship. (Mong các bạn thông cảm cho sự bất tiện này)
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={handleButtonTransport}
                    className="cursor-pointer"
                  >
                    Thay đổi
                  </div>
                  <div>{convertPrice(diliveryPriceMemo)}</div>
                </div>
              )}
            </div>
            <ModalComponent
              title="Cập nhập phương thức vận chuyển"
              isOpen={isModalTransition}
              onOk={handleConfirmRadio}
              onCancel={() => setIsOpenModalTransition(false)}
              okText="Cập nhập"
              cancelText="Thoát"
            >
              <Radio.Group onChange={onchangeRadioShip} value={valueRadioShip}>
                <Space direction="vertical">
                  {stateUserDetail?.nameCity === "Thành phố Đà Nẵng" && (
                    <Radio value="shop_giao">
                      <div className="flex w-full justify-between">
                        <div>Được vận chuyển bởi shop</div>
                        <div
                          className="text-right"
                          style={{
                            position: "absolute",
                            right: "0",
                            marginRight: "30px",
                          }}
                        >
                          {convertPrice(15000)}
                        </div>
                      </div>
                      <div>
                        Được áp dụng cho đơn hàng vận chuyện ở Tp Đà Nẵng
                      </div>
                    </Radio>
                  )}
                  <Radio value={showfeeShip?.fee?.ship_fee_only}>
                    <div className="flex w-full justify-between">
                      <div>Được vận chuyển bởi Giao Hàng Tiết Kiệm</div>
                      <div
                        className="text-right"
                        style={{
                          position: "absolute",
                          right: "0",
                          marginRight: "30px",
                        }}
                      >
                        {convertPrice(showfeeShip?.fee?.ship_fee_only)}
                      </div>
                    </div>
                    <div>
                      Lưu ý:{" "}
                      <span>
                        Tiền ship được tính theo Kg hiện tại sản phẩm của shop
                        chưa cập nhập khối lượng của sản phẩm nên shop để mặc
                        định 1kg(0,5kg tiếp theo = +5.000),sau khi các bạn mua
                        sản phẩm của shop sẽ liên hệ lại bạn để báo giá tiền
                        ship. (Mong các bạn thông cảm cho sự bất tiện này)
                      </span>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </ModalComponent>
          </div>
          <div className="w-full bg-[#ebe6e6] p-5">
            <div className=" mr-5 flex" style={{ justifyContent: "right" }}>
              <div>
                Tổng số tiền ({order?.orderItemsSlected?.length || "0"} sản
                phẩm):{" "}
              </div>
              <div className="ml-1">{convertPrice(TotalpriceMemo)}</div>
            </div>
          </div>

          <div className=" mt-5 border-[1px] border-slate-400 bg-[#ebe6e6] p-5">
            <div className=""></div>
            <div className="flex  justify-between" style={{alignItems:'center'}}>
              <div className="w-full text-[17px]  md:text-[22px]">
                <SellIcon className="text-[red]" />
                Voucher của shop
              </div>
              <div className="flex w-full justify-between">
                <div>
                </div>
                <div className="flex " style={{alignItems:'center'}}>
                  <div>
                  {valueVouchermutation?.data?.discountPercent && (
                    <div className="flex" style={{alignItems:'center'}} >
                    <img src={IconVoucher} className="w-[65px] h-[50px]" style={{position:'relative'}}/>
                    <span className="text-[10px] text-[red]">đã áp dụng mẫ giảm giá</span>
                    <div style={{ position: 'absolute', color: '#000', fontSize: '10px' }}
                    className=" transform translate-x-[80%] -translate-y-[0%] md:translate-x-[120%] md:-translate-y-[5%]"
                    >
                        -{valueVouchermutation?.data?.discountPercent}%
                    </div>
                    </div>
                )}
                  </div>
                  <div
                    className="cursor-pointer text-[#2544a1] hover:text-[#3161f0] ml-3 text-[12px]  md:text-[16px]"
                    onClick={handleButtonVoucher}
                  >
                    Chọn Voucher
                  </div>
                </div>
                <ModalComponent
                  title="Voucher shop"
                  isOpen={isModalVoucher}
                  onOk={handleButtonOkVoucher}
                  onCancel={() => setIsModalVoucher(false)}
                  okText="Ok"
                  cancelText="Thoát"
                >
                  <IsLoadingComponent isLoading={isLoadingVoucher}>
                      <div style={{ maxHeight: '500px', overflowY: 'auto', marginTop:'20px' }}>
                    <Radio.Group onChange={onChangeRadioVoucher} value={valueRadiovoucher}>
                      {dataVoucher?.data?.map((item) => {
                        const active = isVoucherActive(item.startDate);
                        const timeUntilStart = getTimeUntilStart(item.startDate);
                        const ended = hasVoucherEnded(item.endDate);

                        if (ended) {
                          return null; // Do not render if the voucher has ended
                        }
                        return (
                          <Radio value={item._id} disabled={!active} key={item.id}>
                            <div
                              className={`mb-4 ml-[5px] rounded-lg md:ml-[30px] ${active ? "bg-gradient-to-r from-pink-500 to-orange-500" : "bg-gray-400"} w-full p-4 shadow-md md:p-6`}
                            >
                              <div className="flex items-center justify-between">
                                <h1 className="text-[16px] font-bold text-white md:text-[17px]">
                                  VOUCHERBIVU
                                </h1>
                                <div className="text-white">
                                  <div className="w-[200px]">{item.name}</div>
                                  <div>Số lượng: {item.quantity}</div>
                                </div>
                              </div>
                              <div>
                                <div className="mt-4 text-white">
                                  HSD: {formatDate(item.startDate)} -{" "}
                                  {formatDate(item.endDate)}
                                </div>
                                {!active && (
                                  <div className="mt-2 text-yellow-300">
                                    Voucher bắt đầu trong: {timeUntilStart.days}d: {timeUntilStart.hours}h: {timeUntilStart.minutes}m: {timeUntilStart.seconds}s
                                  </div>
                                )}
                              </div>
                            </div>
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                    </div>
                  </IsLoadingComponent>
                </ModalComponent>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Chọn phương thức thanh toán",
      content: (
        <>
          <div className="bg-[#ebe6e6] p-5 md:p-10">
            <h2 className="mb-2 text-[20px]">Phương thức thanh toán</h2>
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                <Radio value={2}>Quét mã QR thanh toán</Radio>
                <Radio value={3}>Thanh toán ZALOPAY</Radio>
              </Space>
            </Radio.Group>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (user?.nameCity === "Thành phố Đà Nẵng") {
      setValueRadioShip("shop_giao");
      setValueRadioShipcomplete(valueRadioShip);
    } else {
      setValueRadioShip(showfeeShip?.fee?.ship_fee_only);
    }
  }, [user?.nameCity, showfeeShip]);

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <IsLoadingComponent isLoading={isLoadingAddOrder}>
      <div className="mt-5 w-full p-pad-sm md:p-pad-md">
        <div className="mt-5  bg-[#ebe6e6] p-8 mb-3"> 
          <Steps current={current} items={items} />
        </div>
        <div>{steps[current].content}</div>
        <div className="mt-5  bg-[#ebe6e6] p-5">
          <div className="w-full">
            <div className=" flex justify-between">
              <div></div>
              <div className="mr-4 w-[300px]">
                <div className="flex justify-between ">
                  <div>Tổng tiền hàng: </div>
                  <div>{convertPrice(priceMemo)}</div>
                </div>
                <div className="flex justify-between">
                  <div>Phí vận chuyển:</div>
                  <div>{convertPrice(diliveryPriceMemo)}</div>
                </div>
                {valueVouchermutation?.data?.discountPercent ? (
                  <div className="flex justify-between">
                    <div>Voucher:</div>
                    <div>{valueVouchermutation?.data?.discountPercent}%</div>
                  </div>
                ): ''}
                <div className="flex justify-between">
                  <div>Tổng thanh Toán:</div>
                  <div>{convertPrice(TotalpriceMemo)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between bg-[#ebe6e6] p-10">
          <div className="text-[10px]">
            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản
            Shopee
          </div>
          <div>
            {current < steps.length - 1 && (
              <ButtonComponent
                textButton="Tiếp tục"
                styleButton={{
                  background: "rgb(255, 57,69)",
                  height: "40px",
                  width: "100%",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                  marginTop: "2px",
                  marginLeft: "10px",
                }}
                onClick={() => next()}
              ></ButtonComponent>
            )}

            {current === steps.length - 1 && (
              <ButtonComponent
                textButton="Mua hàng"
                disabled={
                  !user?.phone ||
                  !user?.address ||
                  !user?.name ||
                  !user?.city ||
                  !valueRadio
                    ? true
                    : false
                }
                styleButton={{
                  background:
                    !user?.phone ||
                    !user?.address ||
                    !user?.name ||
                    !user?.city ||
                    !valueRadio
                      ? "#ccc"
                      : "rgb(255, 57,69)",
                  height: "40px",
                  width: "100%",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                  marginTop: "2px",
                  marginLeft: "10px",
                }}
                onClick={handleButtonPay}
              ></ButtonComponent>
            )}

            {current > 0 && (
              <ButtonComponent
                textButton="Quay lại"
                styleButton={{
                  background: "rgb(255, 57,69)",
                  height: "40px",
                  width: "100%",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                  marginTop: "2px",
                  marginLeft: "10px",
                }}
                onClick={() => prev()}
              ></ButtonComponent>
            )}
          </div>
        </div>
        <ModalComponent
          title="Cập nhập địa chỉ"
          isOpen={isModalUpdateInfo}
          onOk={handleUpdateModal}
          onCancel={() => setIsOpenModalUpdateInfo(false)}
          okText="Chỉnh sửa"
          cancelText="Thoát"
          okButtonProps={{
            disabled:
              !stateUserDetail.name.length ||
              !stateUserDetail.phone.length ||
              !stateUserDetail.city.length ||
              !stateUserDetail.district.length ||
              !stateUserDetail.rard.length ||
              !stateUserDetail.address.length
                ? true
                : false,
          }}
        >
          <IsLoadingComponent isLoading={isLoadingUpdateUserDetail}>
            <div className="mt-5 text-center">
              <FormLabel>
                <div className="flex justify-between">
                  <TextField
                    id="outlined-basic "
                    label="Họ và Tên"
                    variant="outlined"
                    size="small"
                    value={stateUserDetail.name}
                    onChange={handleOnchangeDetails}
                    name="name"
                    error={!stateUserDetail.name.length ? true : false}
                    helperText={
                      !stateUserDetail.name.length
                        ? "Vui lòng nhập Họ và Tên"
                        : ""
                    }
                  />
                  <TextField
                    id="outlined-basic"
                    label="Số điện thoại"
                    variant="outlined"
                    size="small"
                    value={stateUserDetail.phone}
                    onChange={handleOnchangeDetails}
                    name="phone"
                    error={!stateUserDetail.phone.length ? true : false}
                    helperText={
                      !stateUserDetail.phone.length
                        ? "Vui lòng nhập Số điện thoại"
                        : ""
                    }
                  />
                </div>
                <div className="mt-5 flex justify-between">
                  <FormControl sx={{ minWidth: 100, left: 0 }} size="small">
                    <InputLabel id="demo-simple-select-helper-label">
                      Tỉnh/Thành Phố
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={stateUserDetail.city}
                      label="Tỉnh/Thành Phố"
                      onChange={handleOnchangeDetails}
                      style={{ width: "220px" }}
                      name="city"
                      error={!stateUserDetail.city.length ? true : false}
                      helperText={
                        !stateUserDetail.city.length
                          ? "Vui lòng chọn Tỉnh/Thành Phố"
                          : ""
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {getAllCity?.results?.map((item) => {
                        return (
                          <MenuItem value={item?.province_id}>
                            {item?.province_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <FormControl sx={{ minWidth: 100, left: 0 }} size="small">
                    <InputLabel id="demo-simple-select-helper-label">
                      Quận/Huyện
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={stateUserDetail.district}
                      label="Quận/Huyện"
                      onChange={handleOnchangeDetails}
                      style={{ width: "220px" }}
                      disabled={
                        !getDetailAllDistrict?.results?.length ? true : false
                      }
                      name="district"
                      error={!stateUserDetail.district.length ? true : false}
                      helperText={
                        !stateUserDetail.district.length
                          ? "Vui lòng chọn Tỉnh/Thành Phố"
                          : ""
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {getDetailAllDistrict?.results?.map((item) => {
                        return (
                          <MenuItem value={item?.district_id}>
                            {item?.district_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div className="mt-5">
                  <FormControl
                    sx={{ minWidth: 100, left: 0, width: "100%" }}
                    size="small"
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Phường/Xã
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={stateUserDetail.rard}
                      label="Phường/Xã"
                      onChange={handleOnchangeDetails}
                      style={{ width: "100%" }}
                      disabled={
                        !getDetailAllRard?.results?.length ? true : false
                      }
                      name="rard"
                      error={!stateUserDetail.rard.length ? true : false}
                      helperText={
                        !stateUserDetail.rard.length
                          ? "Vui lòng chọn Tỉnh/Thành Phố"
                          : ""
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {getDetailAllRard?.results?.map((item) => {
                        return (
                          <MenuItem value={item?.ward_id}>
                            {item?.ward_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div className="mt-5">
                  <TextField
                    id="outlined-basic"
                    label="Địa chỉ "
                    variant="outlined"
                    size="small"
                    style={{ width: "100%" }}
                    value={stateUserDetail.address}
                    onChange={handleOnchangeDetails}
                    name="address"
                    error={!stateUserDetail.address.length ? true : false}
                    helperText={
                      !stateUserDetail.address.length
                        ? "Vui lòng nhập Địa chỉ"
                        : ""
                    }
                  />
                </div>

                <div className="mt-5">
                  <TextField
                    id="outlined-multiline-static"
                    label="Địa chỉ cụ thể"
                    variant="outlined"
                    size="small"
                    style={{ width: "100%" }}
                    multiline
                    value={stateUserDetail.specific_address}
                    onChange={handleOnchangeDetails}
                    name="specific_address"
                    error={
                      !stateUserDetail.specific_address.length ? true : false
                    }
                    helperText={
                      !stateUserDetail.specific_address.length
                        ? "Vui lòng chọn địa điểm cụ thể"
                        : ""
                    }
                  />
                </div>
              </FormLabel>
            </div>
            <GoogleMapComponent stateUserDetail={stateUserDetail} />
          </IsLoadingComponent>
        </ModalComponent>
      </div>
    </IsLoadingComponent>
  );
}
