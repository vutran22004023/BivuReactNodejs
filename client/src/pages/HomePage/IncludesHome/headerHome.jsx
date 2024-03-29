import { Button, Col, Input, Popover, Row, Space } from "antd";
import React,{useState} from "react";
import {
  WrapperHeaderTop,
  WrapperHeaderMid,
  WrapperHeaderAccount,
  WrapperHeaderCart,
  WrapperHeaderSpan,
  WrapperHeaderTypeProduct,
  WrapperHeaderLink,
} from "../style";

import {WapperContentPopup} from './style'

import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Logo1 from "../../../assets/font-end/imgs/logo/logo1.png";
import Logo2 from "../../../assets/font-end/imgs/logo/logo2.png";
import ButtonInputSearch from "../../../components/ButtonSearch/ButtonInputSearch";
import TypeProduct from "../../../components/TypeProduct/TypeProduct";
import { useSelector, useDispatch } from "react-redux";
import { UserService} from "../../../services/index";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../../redux/Slides/userSlide";
export default function headerHome() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const arr = ["TV", "Tu Lanh", "Dieu hoa"];
  const[loading, setLoading] = useState(false)

  const handLogout = async () => {
    localStorage.removeItem('access_Token');
    document.cookie = 'access_Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    try {
        setLoading(true)
         UserService.LogOutUser();
        navigate('/');
        dispatch(resetUser())
        setLoading(false)
    } catch (error) {
        console.error("Error logging out:", error);
    }
}
  const content = (
    <div>
      <p>Thông tin người dùng</p>
      <WapperContentPopup onClick={handLogout}>Đăng xuất</WapperContentPopup>
    </div>
  );
  return (
    <div>
      <WrapperHeaderTop style={{ textAlign: "center" }}>
        <Col span={4}>
          Xin Chào Bạn Đã Đến Shop |CẢM ƠN BẠN LÀ KHÁCH HÀNG Của Shop
        </Col>
        <Col span={8}>MỌI THÔNG TIN( Bảo Hành)VỀ SẢN PHẨM VUI LÒNG LIÊN HỆ</Col>
        <Col span={8}>
          ZALO SHOP: 0943392799 Fanpage : Cửa Hàng Phật Giáo Bi Vũ
        </Col>
        <Col span={4}>col-6</Col>
      </WrapperHeaderTop>

      <WrapperHeaderMid gutter={16} style={{ textAlign: "center" }}>
        <Col span={4}>
          <img
            src={Logo1}
            style={{
              width: "150px",
              height: "80px",
            }}
          />
        </Col>
        {/* <Col span={9}>
        <img src={Logo2} style={{
            width: '290px',
            height: '80px',
          }}/>
        </Col> */}
        <Col span={14}>
          <ButtonInputSearch
            size="large"
            placeholder="Nhập dữ liệu"
            textButton="Tìm kiếm"
          />
        </Col>

        <Col
          span={6}
          style={{ textAlign: "left", display: "flex", gap: "10px" }}
        >
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "40px" }} />
            {user?.name ? (
              <>
                <Popover content={content}  trigger="click">
                  <div style={{ cursor: "pointer" }}>{user.name}</div>
                </Popover>
              </>
            ) : (
              <div>
                <WrapperHeaderLink to={"/login"}>
                  Đăng Nhập/ Đăng Kí
                </WrapperHeaderLink>
                <div>
                  Tài Khoản{" "}
                  <WrapperHeaderSpan>
                    <CaretDownOutlined />
                  </WrapperHeaderSpan>
                </div>
              </div>
            )}
          </WrapperHeaderAccount>
          <WrapperHeaderCart style={{ textAlign: "center" }}>
            <ShoppingCartOutlined style={{ fontSize: "40px" }} />
            <WrapperHeaderSpan>Giỏ hàng</WrapperHeaderSpan>
          </WrapperHeaderCart>
        </Col>
      </WrapperHeaderMid>

      <WrapperHeaderTypeProduct>
        {arr.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
      </WrapperHeaderTypeProduct>
    </div>
  );
}
