import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import ButtonComponent from '../../../../components/ButtonSearch/Button'
export default function PayProduct() {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="mt-5 w-full p-pad-sm md:p-pad-md">
      <div className="bg-[#dc6363] p-5 md:p-10">
        <div>Địa chỉ nhà Hàng</div>
        <div className="flex">
          <div className=""> Vũ Trần (+84 906472426)</div>
          <div className="">
            {" "}
            427 Kinh Dương Vương, Phương Hòa Mình, Quận Liên Chiểu, Đà Nẵng
          </div>
          <div> Thay đổi</div>
        </div>
      </div>

      <div className="mt-5 w-full bg-[#dc6363] p-5 text-center md:p-10">
        <div className="flex justify-between">
          <div className="w-35 flex-auto text-left md:w-32">Sản phẩm</div>
          <div className="w-5 flex-auto"></div>
          <div className="flex">
            <div className="w-20 flex-auto md:w-40">Đơn giá</div>
            <div className="w-20 flex-auto md:w-40">Số Lượng</div>
            <div className="w-20 flex-auto text-right md:w-40 ">Thành Tiền</div>
          </div>
        </div>

        <div className="mt-5 flex justify-between ">
          <div className="w-35 flex-auto text-left md:w-32">Sản phẩm 1</div>
          <div className="w-5 flex-auto">Sản phẩm</div>
          <div className="flex">
            <div className="w-20 flex-auto md:w-40">20.000 vnd</div>
            <div className="w-20 flex-auto md:w-40">1</div>
            <div className="w-20 flex-auto text-right md:w-40 ">20.000vnd</div>
          </div>
        </div>
      </div>

      <div className=" flex border-[1px] border-slate-400 bg-[#dc6363]">
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
            <div>20.000 VND</div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#dc6363] p-5">
        <div className=" mr-5 flex" style={{ justifyContent: "right" }}>
          <div>Tổng số tiền (1 sản phẩm): </div>
          <div className="ml-1">20.000 VND</div>
        </div>
      </div>

      <div className="mt-5  bg-[#dc6363] p-5">
        <div className="mb-2">Phương thức thanh toán:</div>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Thẻ tính dụng" value="1" />
              <Tab label="Quét mã QR" value="2" />
              <Tab label="Thanh toán khi nhận hàng" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <div>tab1</div>
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <div>Tab2</div>
          </TabPanel>
          <TabPanel value="3" sx={{ p: 0 }}>
            <div>
              Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận
              chuyển (nếu có) áp dụng cả với phí thu hộ.
            </div>
          </TabPanel>
        </TabContext>
        <div className="w-full">
          <div className=" flex justify-between">
            <div></div>
            <div className="w-[300px] mr-4">
              <div className="flex justify-between ">
                <div>Tổng tiền hàng: </div>
                <div>20.000 VND</div>
              </div>
              <div className="flex justify-between">
                <div>Phí vận chuyển:</div>
                <div>20.000 VND</div>
              </div>
              <div className="flex justify-between">
                <div>Tổng thanh Toán:</div>
                <div>20.000 VND</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 bg-[#dc6363] flex justify-between">
            <div className="text-[10px]">Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Shopee</div>
            <div>
              <ButtonComponent
              textButton='Mua hàng' 
              styleButton={{
              background:'red',
              height: "40px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              marginTop: '2px',
              marginLeft: '10px'
            }}>
                
              </ButtonComponent>
            </div>
      </div>
    </div>
  );
}
