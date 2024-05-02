import React from "react";
import { Steps } from "antd";
import Product1 from "../../../../assets/font-end/imgs/Product/product1.png";
import { OrderProduct } from "../../../../services/index";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import {convertPrice} from '../../../../utils'
export default function OrderProductDetail() {
  const description = "This is a description.";
  const location = useLocation();
  const { state } = location;
  const fetchOrderDetailProduct = async () => {
    const id = state?.id;
    const access_Token = state?.token.split("=")[1];
    const res = await OrderProduct.getDetailOrderProduct(id, access_Token);
    return res;
  };

  const { data: order, isLoading: isLoadingProductsLimit } = useQuery({
    queryKey: ["orderDetailProduct"],
    queryFn: fetchOrderDetailProduct,
    enabled: Boolean(state?.id && state?.token),
  });
  console.log(order);

  return (
    <div className="mt-5 w-full p-pad-sm md:p-pad-md ">
      <div className="flex justify-between p-3 ">
        <div>Trở lại</div>
        <div className="flex " style={{ alignItems: "center" }}>
          <div>MÃ ĐƠN HÀNG: {order?.data?._id}</div>
          <div
            className="h-4 w-[1px] bg-black"
            style={{ margin: "0 4px" }}
          ></div>
          <div>ĐƠN HÀNG ĐÃ HOÀN THÀNH</div>
        </div>
      </div>
      <hr />
      <div className="p-[20px]">
        <Steps
          current={5}
          items={[
            {
              title: "Đặt đơn hàng",
              description,
            },
            {
              title: "Thanh toán",
              description,
            },
            {
              title: "Đã giáo cho ĐVVC",
              description,
            },
            {
              title: "Đã nhận được hàng",
              description,
            },

            {
              title: "Đơn hàng đã Hòa hành",
              description,
            },
          ]}
        />
      </div>
      <div className="p-[5px] md:p-[20px]">
        <div className="flex justify-between">
          <div>Địa Chỉ Nhận Hàng</div>
          <div>Thông tin chỗ đơn hàng</div>
        </div>
        <div className="flex">
          <div className="w-[500px] grow ">
            <div>{order?.data?.shippingAddress?.fullName}</div>
            <div>(+84) {order?.data?.shippingAddress?.phone}</div>
            <div>{order?.data?.shippingAddress?.address}</div>
          </div>
          <div
            className="h-auto w-[2px] bg-black"
            style={{ margin: "0 20px" }}
          ></div>
          <div className="w-[800px] grow ">
            <Steps
              current={5}
              direction="vertical"
              items={[
                {
                  title: "Đặt đơn hàng",
                  description,
                  subTitle: "Left 00:00:08",
                },
                {
                  title: "Thanh toán",
                  description,
                  subTitle: "Left 00:00:08",
                },
                {
                  title: "Đã giáo cho ĐVVC",
                  description,
                },
                {
                  title: "Đã nhận được hàng",
                  description,
                },

                {
                  title: "Đơn hàng đã Hòa hành",
                  description,
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="p-[5px] md:p-[20px]">
        {order?.data?.oderItems?.map((item) => {
          return (
            <div
              className="flex justify-between"
              style={{ alignItems: "center" }}
            >
              <div className="flex">
                <div>
                  <img src={item.image} className="h-[80px] w-[80px]" />
                </div>
                <div className="ml-3">
                  <div>{item.name}</div>
                  <div>Phân loại hàng: Đen bóng</div>
                  <div>x{item.amount}</div>
                </div>
              </div>
              <div>
                <div>{convertPrice(item.price)}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div className=" flex ">
          <div className="flex w-[100px] grow justify-between  border-2 p-3 md:w-[700px]">
            <div></div>
            <div>Tổng tiền hàng</div>
          </div>
          <div className="flex flex-1 justify-between border-2 p-3">
            <div></div>
            <div>{convertPrice(order?.data?.itemsPrice)}</div>
          </div>
        </div>

        <div className=" flex">
          <div className="flex w-[100px] grow justify-between  border-2 p-3 md:w-[700px]">
            <div></div>
            <div>Phí vận chuyển</div>
          </div>
          <div className="flex flex-1 justify-between border-2 p-3">
            <div></div>
            <div>{convertPrice(order?.data?.shippingPrice)}</div>
          </div>
        </div>

        <div className=" flex">
          <div className="flex w-[100px] grow justify-between  border-2 p-3 md:w-[700px]">
            <div></div>
            <div>Giảm giá phí vận chuyển</div>
          </div>
          <div className="flex flex-1 justify-between border-2 p-3">
            <div></div>
            <div>0%</div>
          </div>
        </div>

        <div className=" flex">
          <div className="flex w-[100px] grow justify-between  border-2 p-3 md:w-[700px]">
            <div></div>
            <div>Voucher từ Shop</div>
          </div>
          <div className="flex flex-1 justify-between border-2 p-3">
            <div></div>
            <div>0%</div>
          </div>
        </div>

        <div className=" flex">
          <div className="flex w-[100px] grow justify-between  border-2 p-3 md:w-[700px]">
            <div></div>
            <div>Thành tiền</div>
          </div>
          <div className="flex flex-1 justify-between border-2 p-3">
            <div></div>
            <div>{convertPrice(order?.data?.totalPrice)}</div>
          </div>
        </div>
        <div className=" flex">
          <div className="flex w-[100px] grow justify-between  border-2 p-3 md:w-[700px]">
            <div></div>
            <div>Phương thức Thanh toán</div>
          </div>
          <div className="flex flex-1 justify-between border-2 p-3">
            <div></div>
            <div>{order?.data?.paymentMethod}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
