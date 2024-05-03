import React, { useState, useEffect, useMemo } from "react";
import ButtonComponent from "../../../../components/ButtonSearch/Button";
import { useSelector, useDispatch } from "react-redux";
import { convertPrice } from "../../../../utils";
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
  PaymentService
} from "../../../../services/index";
import { useQuery } from "@tanstack/react-query";
import { useMutationHooks } from "../../../../hooks/UseMutationHook";
import {
  success,
  error,
  warning,
} from "../../../../components/MessageComponents/Message.jsx";
import IsLoadingComponent from "../../../../components/LoadComponent/Loading.jsx";
import { Steps, theme, Radio, Space } from "antd";
export default function PayProduct() {
  const [value, setValue] = useState();
  const [valueRadio, setValueRadio] = useState();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [SleectNamecity, setSleectNamecity] = useState("");
  const [SleectDistrict, setSleectDistrict] = useState("");
  const [SleectRard, setSleectRard] = useState("");
  const [isModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
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
      mutationOrderProduct.mutate({
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

      if(valueRadio === "Thanh toán khi nhận hàng") {
        
      }else if(valueRadio === "Thanh toán QR") {
        mutationPayQR.mutate()
      }else if(valueRadio === "Thanh toán Zalopay") {
        mutationPayZaloPay.mutate()
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

  const mutationPayQR = useMutationHooks(async() => {
    try {
      const res = await PaymentService.createPaymentLink();
      // Kiểm tra xem API đã trả về thành công hay không
      if (res && res.url) {
          // Chuyển hướng người dùng đến URL mới
          window.location.href = res.url;
      } else {
          // Xử lý trường hợp API trả về không thành công
          console.error("Lỗi: Không có URL trả về từ API thanh toán.");
      }
  } catch (error) {
      console.error("Lỗi khi gọi API thanh toán:", error);
  }
  });

  const mutationPayZaloPay = useMutationHooks(async() => {
    try {
      const res = await PaymentService.createPaymentZaloPay();
      // Kiểm tra xem API đã trả về thành công hay không
      return res
  } catch (error) {
      console.error("Lỗi khi gọi API thanh toán:", error);
  }
  });

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

  const { data: getAllCity } = useQuery({
    queryKey: ["fetchProvincevn"],
    queryFn: fetchProvincevn,
  });
  const { data: getDetailAllDistrict } = fetchDetailDistrict;
  const { data: getDetailAllRard } = fetchDetailRard;
  const { data: UsersUpdateDetail, isLoading: isLoadingUpdateUserDetail } =
    mutationUpdate;
  const { data: orderProductPay, isLoading: isLoadingAddOrder } =
    mutationOrderProduct;
  const {data: payQR} =mutationPayQR
  const {data: PayZalo}=mutationPayZaloPay
  console.log(PayZalo)
  useEffect(()=> {
    if (PayZalo) {
      // Chuyển hướng người dùng đến URL được trả về từ API
      window.location.href = PayZalo.order_url;
  }
  },[PayZalo])

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
    if (priceMemo > 100000) {
      return 35000;
    } else if (priceMemo) {
      return 20000;
    }
    return 0;
  }, [priceMemo]);

  const TotalpriceMemo = useMemo(() => {
    return priceMemo + diliveryPriceMemo;
  }, [priceMemo, diliveryPriceMemo]);

  const onChange = (e) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    if(value === 1){
      setValueRadio('Thanh toán khi nhận hàng')
    }else if(value ===2) {
      setValueRadio('Thanh toán QR')
    }else if(value === 3) {
      setValueRadio('Thanh toán Zalopay')
    }
  }, [value])


  const steps = [
    {
      title: "Chi tiết thông tin đơn hàng",
      content: (
        <>
          <div className="bg-[#e9d5d5] p-5 md:p-10">
            <h2 className="mb-2 text-[20px]">Địa chỉ nhà Hàng</h2>
            <div className="flex">
              <div className="">
                {" "}
                {user?.name} ({user?.phone})
              </div>
              <div className="">{user?.specific_address}</div>
              <span
                className="ml-2 cursor-pointer text-[#727aa4] hover:text-[#3050ec] "
                onClick={handleOpenModal}
              >
                {" "}
                Thay đổi
              </span>
            </div>
          </div>

          <div className="mt-5 w-full bg-[#e9d5d5] p-5 text-center md:p-10">
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

                  <div className="w-5 flex-auto">Sản phẩm</div>
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

          <div className=" flex border-[1px] border-slate-400 bg-[#e9d5d5]">
            <div className="w-[600px] border-[1px] border-slate-400 p-5">
              <span className="">Lời nhắn: </span>
              <input />
            </div>
            <div className="w-full border-[1px] border-slate-400 p-5">
              <div className="mr-4 flex justify-between">
                <div className="text-[15px]">Đơn vị vận chuyển: </div>
                <div>
                  <p>Nhanh</p>
                  <p>Đảm bảo nhận hàng từ 22 Tháng 4 - 23 Tháng 4</p>
                </div>
                <div>Thay đổi</div>
                <div>{convertPrice(diliveryPriceMemo)}</div>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#e9d5d5] p-5">
            <div className=" mr-5 flex" style={{ justifyContent: "right" }}>
              <div>
                Tổng số tiền ({order?.orderItemsSlected?.length || "0"} sản
                phẩm):{" "}
              </div>
              <div className="ml-1">{convertPrice(TotalpriceMemo)}</div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Chọn phương thức thanh toán",
      content: (
        <>
          <div className="bg-[#e9d5d5] p-5 md:p-10">
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
  const { token } = theme.useToken();
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
        <Steps current={current} items={items} />
        <div>{steps[current].content}</div>
        <div className="mt-5  bg-[#e9d5d5] p-5">
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
                <div className="flex justify-between">
                  <div>Tổng thanh Toán:</div>
                  <div>{convertPrice(TotalpriceMemo)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between bg-[#e9d5d5] p-10">
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
                  !user?.phone || !user?.address || !user?.name || !user?.city || !valueRadio
                    ? true
                    : false
                }
                styleButton={{
                  background:
                    !user?.phone || !user?.address || !user?.name || !user?.city || !valueRadio
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
          </IsLoadingComponent>
        </ModalComponent>
      </div>
    </IsLoadingComponent>
  );
}
