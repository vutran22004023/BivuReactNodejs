import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../../../../components/ProductDetails/ProductDetail";
import { Avatar, Rate, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function DetailProduct() {
  const { id } = useParams();
  const [value, setValue] = useState(3);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  return (
    <div className="mt-4 bg-[] md:p-pad-md">
      <h5>Trang chu</h5>
      <div style={{ backgroundColor: "#fff" }}>
        <ProductDetail idProduct={id} />
      </div>
      <div>
        <div className="h-[400px] bg-[#ccc] p-5">
          <h2 style={{ fontWeight: "600" }}>Đánh giá sản phẩm</h2>
          <div className="h-10 bg-[#af5e5e]"></div>
          <div style={{ padding: "5px 10px" }}>
            <div>
              <div className="flex " style={{alignItems: "start"}}>
                <Space Spacewrap size={10} className="mt-2">
                  <Avatar size="large" icon={<UserOutlined />} />
                </Space>
                <div className="ml-3">
                  <p>Vu Tran</p>
                  <div className="">
                    <Rate tooltips={desc} onChange={setValue} value={value} />
                  </div>
                  <div
                    className="flex text-center"
                    style={{ alignItems: "center" }}
                  >
                    <div>thời gian</div>
                    <div className=" h-5 w-[2px] bg-[#c12c2c]" style={{margin: '0 5px'}}></div>
                    <div>Phân loại hàng: adsadasdsa</div>
                  </div>
                  <div>Chất liệu: <span>Tốt</span></div>
                  <div>Màu sắc: <span>đen</span></div>
                  <div>Hàng đc đóng gói rất chắc chắn và chất lượng nên mua thử để dùng</div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
