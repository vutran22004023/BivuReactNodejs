import React, { useState,useEffect } from "react";
import TabContext from "@mui/lab/TabContext";
import { Box, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { OrderProduct } from "../../../../services/index";
import { useLocation, useParams } from "react-router-dom";
import Product1 from "../../../../assets/font-end/imgs/Product/product1.png";
import ButtonFrom from "../../../../components/ButtonSearch/Button";

export default function OrderDetail() {
  const [value, setValue] = useState("1");
  const location = useLocation();
  const { state } = location;
  const user = useSelector((state) => state.user);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchOrderDetailUser = async () => {
    const id = state?.id;
    const access_Token = state?.token.split("=")[1];
    const res = await OrderProduct.getDetailOrder(id, access_Token);
    return res;
  };

  const { data: productsLimit, isLoading: isLoadingProductsLimit } = useQuery({
    queryKey: ["orderDetailUser"],
    queryFn: fetchOrderDetailUser,
    enabled: Boolean(state?.id && state?.token),
  });
  

  return (
    <div className="mt-5 w-full p-pad-sm md:p-pad-md">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 0.5, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tất cả" value="1" />
            <Tab label="Chờ thanh toán" value="2" />
            <Tab label="Vận chuyển" value="3" />
            <Tab label="Chờ giao hàng" value="4" />
            <Tab label="Hoàn thành" value="5" />
            <Tab label="Trả hàng/ Hoàn tiền" value="6" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ p: "15px 0" }}>
          {productsLimit?.data.map((order, index) => {
            return (
              <div className="bg-slate-300 p-5 mb-3">
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
                {order?.oderItems.map((orderItem,index) => {
                  return (
                    <div
                      className="flex justify-between"
                      style={{ alignItems: "center" }}
                    
                    >
                      <div className="flex">
                        <div>
                          <img src={orderItem.image} className="h-[80px] w-[80px]" />
                        </div>
                        <div className="ml-3">
                          <div>{orderItem.name}</div>
                          <div>Phân loại hàng: Đen bóng</div>
                          <div>x{orderItem.amount}</div>
                        </div>
                      </div>
                      <div>
                        <div>{orderItem.price}</div>
                      </div>
                    </div>
                  );
                })}
                <hr style={{ margin: "10px 0" }} />
                <div className="flex justify-between">
                  <div></div>
                  <div>
                    Thành Tiền <span>{order.totalPrice}</span>
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
          <div>2</div>
        </TabPanel>
        <TabPanel value="3" sx={{ p: "15px 0" }}>
          <div>2</div>
        </TabPanel>
        <TabPanel value="4" sx={{ p: "15px 0" }}>
          <div>2</div>
        </TabPanel>
        <TabPanel value="5" sx={{ p: "15px 0" }}>
          <div>2</div>
        </TabPanel>
        <TabPanel value="6" sx={{ p: "15px 0" }}>
          <div>2</div>
        </TabPanel>
      </TabContext>
    </div>
  );
}
