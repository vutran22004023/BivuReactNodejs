import React, { useState, useEffect } from "react";
import TabContext from "@mui/lab/TabContext";
import { Box, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { OrderProduct,ReviewService } from "../../../../services/index";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Product1 from "../../../../assets/font-end/imgs/Product/product1.png";
import ButtonFrom from "../../../../components/ButtonSearch/Button";
import { AddOrderProduct } from "../../../../redux/Slides/orderProductSlide";
import { useMutationHooks } from "../../../../hooks/UseMutationHook";
import IsModalComponent from "../../../../components/ModalComponent/Modal";
import {convertPrice} from '../../../../utils.js'
import { Form, Input, Rate } from "antd";
import {
  success,
  error,
  warning,
} from "../../../../components/MessageComponents/Message.jsx";
const { TextArea } = Input;
export default function OrderDetail() {
  const desc = ["Tệ", "Không hài lòng", "Bình thường", "Hài lòng", "Tuyệt vời"];
  const [value, setValue] = useState("1");
  const location = useLocation();
  const [valueRate, setValueRate] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueidOrder, setValueIdOrder] = useState("");
   const [stateReview, setStateReview] = useState([]);

  const handleTargetsReview = (e, index) => {
    const { name, value } = e.target;
    const updatedReviews = [...stateReview];
    updatedReviews[index][name] = value;
    setStateReview(updatedReviews);
  };
  
  const handleRateChange = (value, index) => {
    const updatedReviews = [...stateReview];
    updatedReviews[index].rating = value;
    setStateReview(updatedReviews);
  };
  const { state } = location;
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchOrderDetailUser = async () => {
    const id = state?.id;
    const access_Token = state?.token.split("=")[1];
    const res = await OrderProduct.getDetailOrder(id, access_Token);
    return res;
  };

  const fetchOrderDetailProduct = useMutationHooks(async (id) => {
    const access_Token = state?.token.split("=")[1];
    const res = await OrderProduct.getDetailOrderProduct(id, access_Token);
    return res;
  });
  const mutationsUpdateOrderProduct = useMutationHooks(async(data) => {
    const access_Token =  user.access_Token.split("=")[1];
    const res = await OrderProduct.updateOrderProduct(valueidOrder,data,access_Token)
    return res
  })

  const mutationsCreateReview = useMutationHooks(async (data) => {
    const access_Token = state?.token.split("=")[1];
    const res = await ReviewService.createReview(data, access_Token);
    return res;
  })

  const { data: productsLimit, isLoading: isLoadingProductsLimit } = useQuery({
    queryKey: ["orderDetailUser"],
    queryFn: fetchOrderDetailUser,
    enabled: Boolean(state?.id && state?.token),
  });

  const {data: dataReview, isLoading: isLoadingDataReview} = mutationsCreateReview
  useEffect(() => {
    if(dataReview?.status === 200 ) {
      success('Đã đánh giá sản phẩm thành công')
      mutationsUpdateOrderProduct.mutate({review:true})
      setIsModalOpen(false);

    }
  },[dataReview?.status])

  const handleButtonDetailOrder = (id) => {
    navigate(`/chi-tiet-don-hang/${id}`, {
      state: {
        id: id,
        token: user?.access_Token,
      },
    });
  };

  const handleButtonRepurchase = (id) => {
    fetchOrderDetailProduct.mutate(id);
    const { data: orderDetail } = fetchOrderDetailProduct;
    orderDetail?.data?.oderItems.forEach((item) => {
      dispatch(
        AddOrderProduct({
          orderItem: {
            name: item?.name,
            amount: item?.amount,
            image: item?.image,
            price: item?.price,
            product: item?.product,
          },
        }),
      );
      navigate("/gio-hang", { state: { listChecked: item?.product } });
    });
  };
  
  const handleOk = () => {
    stateReview.map((item) => {
      mutationsCreateReview.mutate(item);
    })
  };
  const handleButtonReview = (id) => {
    setIsModalOpen(true);
    setValueIdOrder(id);
  };
  const handleCancelModalReview = () => {
    setIsModalOpen(false);
  };

  const unpaidOrders = productsLimit?.data.filter((order) => !order.isPaid);
  const unreviewOrders = productsLimit?.data.filter((order) => !order.review);
  const unisDeliveredOrders = productsLimit?.data.filter(
    (order) => !order.isDelivered,
  );
  const CompleteOrders = productsLimit?.data.filter(
    (order) => order.isDelivered && order.isPaid && order.confirmation_Order,
  );
  const reviewOrdersId = productsLimit?.data.filter(
    (order) => order._id === valueidOrder,
  );
  const reviewOrders =
    reviewOrdersId?.length > 0
      ? reviewOrdersId[0]?.oderItems?.map((item) => {
          return item;
        })
      : []; 
      useEffect(() => {
        if (reviewOrders) {
          const tempReviews = reviewOrders.map((item) => ({
            productId: item.productId,
            userId: user.id,
            product: [
              {
                name: item.name,
                size: item.category,
                color: "",
              },
            ],
            userName: user.name,
            avatar: user.avatar,
            rating: valueRate,
            comments: "",
          }));
          setStateReview(tempReviews);
        }
      }, [reviewOrders.length]);


  return (
    <div className="mt-5 w-full p-pad-sm md:p-pad-md">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 0.5, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tất cả" value="1" />
            <Tab label="Chờ thanh toán" value="2" />
            <Tab label="Chờ giao hàng" value="4" />
            <Tab label="Hoàn thành" value="5" />
            <Tab label="Trả hàng/ Hoàn tiền" value="6" />
            <Tab label="Đánh giá" value="7" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ p: "15px 0" }}>
          {productsLimit?.data.map((order, index) => {
            return (
              <div className="mb-3 bg-slate-300 p-5">
                <div className="flex justify-between">
                  <div></div>
                  <div className="flex " style={{ alignItems: "center" }}>
                    <div>Đơn hàng đã được giao thành công</div>
                    <div
                      className="h-full w-[2px] bg-slate-300"
                      style={{ margin: "0 3px", alignItems: "center" }}
                    ></div>
                    <div>HOÀN THÀNH</div>
                  </div>
                </div>
                <hr style={{ margin: "10px 0" }} />
                {order?.oderItems.map((orderItem, index) => {
                  return (
                    <div
                      className="flex justify-between"
                      style={{ alignItems: "center" }}
                    >
                      <div className="flex">
                        <div>
                          <img
                            src={orderItem.image}
                            className="h-[80px] w-[80px]"
                          />
                        </div>
                        <div className="ml-3">
                          <div>{orderItem.name}</div>
                          <div>Phân loại hàng: Đen bóng</div>
                          <div>x{orderItem.amount}</div>
                        </div>
                      </div>
                      <div>
                        <div>{convertPrice(orderItem.price)}</div>
                      </div>
                    </div>
                  );
                })}
                <hr style={{ margin: "10px 0" }} />
                <div className="flex justify-between">
                  <div></div>
                  <div>
                    Thành Tiền: <span>{convertPrice(order.totalPrice)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div></div>
                  <div className="flex">
                    <div className="mr-3">
                      <ButtonFrom
                        size={40}
                        styleButton={{
                          background: "#ccc",
                          height: "40px",
                          width: "100%",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "15px",
                          fontWeight: "700",
                          margin: "10px 0",
                        }}
                        textButton={"Mua lại"}
                        onClick={() => handleButtonRepurchase(order?._id)}
                      ></ButtonFrom>
                    </div>
                    <div>
                      <ButtonFrom
                        size={40}
                        styleButton={{
                          background: "#ccc",
                          height: "40px",
                          width: "100%",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "15px",
                          fontWeight: "700",
                          margin: "10px 0",
                        }}
                        onClick={() => handleButtonDetailOrder(order?._id)}
                        textButton={"Chi tiết đơn hàng"}
                      ></ButtonFrom>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </TabPanel>
        <TabPanel value="2" sx={{ p: "15px 0" }}>
          {unpaidOrders?.map((order, index) => {
            return (
              <div className="mb-3 bg-slate-300 p-5">
                <div className="flex justify-between">
                  <div></div>
                  <div className="flex " style={{ alignItems: "center" }}>
                    <div>Đơn hàng đã được giao thành công</div>
                    <div
                      className="h-full w-[2px] bg-slate-300"
                      style={{ margin: "0 3px", alignItems: "center" }}
                    ></div>
                    <div>HOÀN THÀNH</div>
                  </div>
                </div>
                <hr style={{ margin: "10px 0" }} />
                {order?.oderItems.map((orderItem, index) => {
                  return (
                    <div
                      className="flex justify-between"
                      style={{ alignItems: "center" }}
                    >
                      <div className="flex">
                        <div>
                          <img
                            src={orderItem.image}
                            className="h-[80px] w-[80px]"
                          />
                        </div>
                        <div className="ml-3">
                          <div>{orderItem.name}</div>
                          <div>Phân loại hàng: Đen bóng</div>
                          <div>x{orderItem.amount}</div>
                        </div>
                      </div>
                      <div>
                        <div>{convertPrice(orderItem.price)}</div>
                      </div>
                    </div>
                  );
                })}
                <hr style={{ margin: "10px 0" }} />
                <div className="flex justify-between">
                  <div></div>
                  <div>
                    Thành Tiền: <span>{convertPrice(order.totalPrice)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div></div>
                  <div className="flex">
                    <div className="mr-3">
                      <ButtonFrom
                        size={40}
                        styleButton={{
                          background: "#ccc",
                          height: "40px",
                          width: "100%",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "15px",
                          fontWeight: "700",
                          margin: "10px 0",
                        }}
                        textButton={"Mua lại"}
                        onClick={() => handleButtonRepurchase(order?._id)}
                      ></ButtonFrom>
                    </div>
                    <div>
                      <ButtonFrom
                        size={40}
                        styleButton={{
                          background: "#ccc",
                          height: "40px",
                          width: "100%",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "15px",
                          fontWeight: "700",
                          margin: "10px 0",
                        }}
                        onClick={() => handleButtonDetailOrder(order?._id)}
                        textButton={"Chi tiết đơn hàng"}
                      ></ButtonFrom>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </TabPanel>
        <TabPanel value="4" sx={{ p: "15px 0" }}>
          {unisDeliveredOrders?.map((order, index) => {
            return (
              <div className="mb-3 bg-slate-300 p-5">
                <div className="flex justify-between">
                  <div></div>
                  <div className="flex " style={{ alignItems: "center" }}>
                    <div>Đơn hàng đã được giao thành công</div>
                    <div
                      className="h-full w-[2px] bg-slate-300"
                      style={{ margin: "0 3px", alignItems: "center" }}
                    ></div>
                    <div>HOÀN THÀNH</div>
                  </div>
                </div>
                <hr style={{ margin: "10px 0" }} />
                {order?.oderItems.map((orderItem, index) => {
                  return (
                    <div
                      className="flex justify-between"
                      style={{ alignItems: "center" }}
                    >
                      <div className="flex">
                        <div>
                          <img
                            src={orderItem.image}
                            className="h-[80px] w-[80px]"
                          />
                        </div>
                        <div className="ml-3">
                          <div>{orderItem.name}</div>
                          <div>Phân loại hàng: Đen bóng</div>
                          <div>x{orderItem.amount}</div>
                        </div>
                      </div>
                      <div>
                        <div>{convertPrice(orderItem.price)}</div>
                      </div>
                    </div>
                  );
                })}
                <hr style={{ margin: "10px 0" }} />
                <div className="flex justify-between">
                  <div></div>
                  <div>
                    Thành Tiền: <span>{convertPrice(order.totalPrice)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div></div>
                  <div className="flex">
                    <div className="mr-3">
                      <ButtonFrom
                        size={40}
                        styleButton={{
                          background: "#ccc",
                          height: "40px",
                          width: "100%",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "15px",
                          fontWeight: "700",
                          margin: "10px 0",
                        }}
                        textButton={"Mua lại"}
                        onClick={() => handleButtonRepurchase(order?._id)}
                      ></ButtonFrom>
                    </div>
                    <div>
                      <ButtonFrom
                        size={40}
                        styleButton={{
                          background: "#ccc",
                          height: "40px",
                          width: "100%",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "15px",
                          fontWeight: "700",
                          margin: "10px 0",
                        }}
                        onClick={() => handleButtonDetailOrder(order?._id)}
                        textButton={"Chi tiết đơn hàng"}
                      ></ButtonFrom>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </TabPanel>
        <TabPanel value="5" sx={{ p: "15px 0" }}>
          {CompleteOrders?.map((order, index) => {
            return (
              <div className="mb-3 bg-slate-300 p-5">
                <div className="flex justify-between">
                  <div></div>
                  <div className="flex " style={{ alignItems: "center" }}>
                    <div>Đơn hàng đã được giao thành công</div>
                    <div
                      className="h-full w-[2px] bg-slate-300"
                      style={{ margin: "0 3px", alignItems: "center" }}
                    ></div>
                    <div>HOÀN THÀNH</div>
                  </div>
                </div>
                <hr style={{ margin: "10px 0" }} />
                {order?.oderItems.map((orderItem, index) => {
                  return (
                    <div
                      className="flex justify-between"
                      style={{ alignItems: "center" }}
                    >
                      <div className="flex">
                        <div>
                          <img
                            src={orderItem.image}
                            className="h-[80px] w-[80px]"
                          />
                        </div>
                        <div className="ml-3">
                          <div>{orderItem.name}</div>
                          <div>Phân loại hàng: Đen bóng</div>
                          <div>x{orderItem.amount}</div>
                        </div>
                      </div>
                      <div>
                        <div>{convertPrice(orderItem.price)}</div>
                      </div>
                    </div>
                  );
                })}
                <hr style={{ margin: "10px 0" }} />
                <div className="flex justify-between">
                  <div></div>
                  <div>
                    Thành Tiền: <span>{convertPrice(order.totalPrice)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div></div>
                  <div className="flex">
                    <div className="mr-3">
                      <ButtonFrom
                        size={40}
                        styleButton={{
                          background: "#ccc",
                          height: "40px",
                          width: "100%",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "15px",
                          fontWeight: "700",
                          margin: "10px 0",
                        }}
                        textButton={"Mua lại"}
                        onClick={() => handleButtonRepurchase(order?._id)}
                      ></ButtonFrom>
                    </div>
                    <div>
                      <ButtonFrom
                        size={40}
                        styleButton={{
                          background: "#ccc",
                          height: "40px",
                          width: "100%",
                          border: "none",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "15px",
                          fontWeight: "700",
                          margin: "10px 0",
                        }}
                        onClick={() => handleButtonDetailOrder(order?._id)}
                        textButton={"Chi tiết đơn hàng"}
                      ></ButtonFrom>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </TabPanel>
        <TabPanel value="6" sx={{ p: "15px 0" }}>
          <div>2</div>
        </TabPanel>

        <TabPanel value="7" sx={{ p: "15px 0" }}>
          {unreviewOrders?.map((order, index) => {
            return (
              <div className="mb-3 bg-slate-300 p-5">
                <div className="flex justify-between">
                  <div></div>
                  <div className="flex " style={{ alignItems: "center" }}>
                    <div>Đơn hàng đã được giao thành công</div>
                    <div
                      className="h-full w-[2px] bg-slate-300"
                      style={{ margin: "0 3px", alignItems: "center" }}
                    ></div>
                    <div>HOÀN THÀNH</div>
                  </div>
                </div>
                <hr style={{ margin: "10px 0" }} />
                {order?.oderItems.map((orderItem, index) => {
                  return (
                    <div
                      className="flex justify-between"
                      style={{ alignItems: "center" }}
                    >
                      <div className="flex">
                        <div>
                          <img
                            src={orderItem.image}
                            className="h-[80px] w-[80px]"
                          />
                        </div>
                        <div className="ml-3">
                          <div>{orderItem.name}</div>
                          <div>Phân loại hàng: Đen bóng</div>
                          <div>x{orderItem.amount}</div>
                        </div>
                      </div>
                      <div>
                        <div>{convertPrice(orderItem.price)}</div>
                      </div>
                    </div>
                  );
                })}
                <hr style={{ margin: "10px 0" }} />
                <div className="flex justify-between">
                  <div></div>
                  <div>
                    Thành Tiền: <span>{convertPrice(order.totalPrice)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div></div>
                  <div>
                    <ButtonFrom
                      size={40}
                      styleButton={{
                        background: "#ccc",
                        height: "40px",
                        width: "100%",
                        border: "none",
                        borderRadius: "4px",
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: "700",
                        margin: "10px 0",
                      }}
                      onClick={() => handleButtonReview(order?._id)}
                      textButton={"Đánh giá "}
                    ></ButtonFrom>
                  </div>
                </div>
              </div>
            );
          })}

          <IsModalComponent
  isOpen={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancelModalReview}
  okText="Đánh giá"
  cancelText="Thoát"
>
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    // onFinish={onFinish}
    // form= {form}
  >
    <div style={{ margin: "30px 0" }}>
      <div className="bg-slate-200 p-3 rounded-lg">
        {reviewOrders?.map((item, index) => (
          <div key={index} className="flex mb-2">
            <div>
              <img
                style={{ width: "60px", height: "70px" }}
                className="rounded-sm"
                src={item.image}
                alt="Product"
              />
            </div>
            <div className="ml-2">
              <div className="font-semibold">{item.name}</div>
              <div>Số lượng: x{item.amount}</div>
              <div>Giá: {convertPrice(item.price)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-slate-200 p-3 rounded-lg mt-2">
        {stateReview.map((review, index) => (
          <div key={index}>
            <div className="font-semibold text-[20px] mb-2">Đánh giá sản phẩm: {review.product[0].name}</div>
            <Form.Item
              label="Chất lượng sản phẩm "
              name={`rating-${index}`}
            >
              <Rate
                tooltips={desc}
                onChange={(value) => handleRateChange(value, index)}
                value={review.rating}
              />
              {review.rating ? (
                <span className="text-[#000] ml-2">{desc[review.rating - 1]}</span>
              ) : null}
            </Form.Item>

            <Form.Item
              label="Đánh giá sản phẩm"
              name={`comments-${index}`}
            >
              <TextArea
                rows={4}
                placeholder="Nhập đánh giá sản phẩm"
                onChange={(e) => handleTargetsReview(e, index)}
                value={review.comments}
                name="comments"
              />
            </Form.Item>
          </div>
        ))}
      </div>
    </div>
  </Form>
</IsModalComponent>

        </TabPanel>
      </TabContext>
    </div>
  );
}
