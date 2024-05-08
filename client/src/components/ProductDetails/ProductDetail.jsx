import { Col, Row, Image, Space, InputNumber, Button, Rate, Radio } from "antd";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { StarFilled, ShoppingCartOutlined } from "@ant-design/icons";
import {
  WapperProductDetailImageSmall,
  WapperStyleAddressProduct,
  WapperStyleCollImage,
  WapperStyleNameProduct,
  WapperStylePriceProduct,
  WapperStyleTextPriceProduct,
  WapperStyleBlockProduct,
  WapperStyleBlockProductBottom,
  WapperStyleButtonAddProduct,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
  WrapperRadioGroup,
  WrapperRadio,
} from "./style";
import { ProductService } from "../../services/index";
import { useQuery } from "@tanstack/react-query";
import IsLoadingComponent from "../LoadComponent/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AddOrderProduct } from "../../redux/Slides/orderProductSlide";
import ModalComponentLogin from "../ModalComponent/ModalLogin";
import { convertPrice } from "../../utils";
import {
  success,
  error,
  warning,
} from "../../components/MessageComponents/Message";
export const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

export const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

export default function ProductDetail({ idProduct }) {
  const [numberProduct, setNumberProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueRadio, setValueRadio] = useState();
  const [listChecked, setListChecked] = useState([]);
  const onChange = (value) => {
    setNumberProduct(value);
  };
  const onChangeRadio = (e) => {
    setValueRadio(e.target.value);
  };
  const settings1 = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const settings2 = {
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey[1];

    if (id) {
      const res = await ProductService.getDetailProduct(id);
      return res.data;
    }
  };

  const { data: productDetail, isLoading: IsLoadingProductDetail } = useQuery({
    queryKey: ["products-detail", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });

  const [valuePrice, setValuePrice] = useState();

  useEffect(() => {
    if(valueRadio === undefined) {
      setValuePrice(productDetail?.categorySize[0].price)
    }else if(valueRadio && productDetail?.categorySize.find((sizeData) => sizeData.size === valueRadio)) {
      setValuePrice(productDetail?.categorySize.find((sizeData) => sizeData.size === valueRadio).price)
    }

  },[valueRadio,valuePrice])

  //Modal Login and buy card
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hangleAddCartProduct = () => {
    if(valueRadio) {
      dispatch(
        AddOrderProduct({
          orderItem: {
            name: productDetail?.name,
            amount: numberProduct,
            image: productDetail?.image,
            price: valuePrice,
            category: valueRadio,
            product: productDetail?.categorySize.find((sizeData) => sizeData.size === valueRadio)._id,
          },
        }),
      )
    }else {
      dispatch(
        AddOrderProduct({
          orderItem: {
            name: productDetail?.name,
            amount: numberProduct,
            image: productDetail?.image,
            price: valuePrice,
            category: valueRadio,
            product: productDetail?._id,
          },
        }),
      )
    }
    success("Đã thêm sản phẩm vào giỏ hàng")
  };


  const hangleBuyProduct = () => {
    if (!user?.id) {
      showModal();
      error('Vui lòng đăng nhập')
    } else {
      if(valueRadio) {
        dispatch(
          AddOrderProduct({
            orderItem: {
              name: productDetail?.name,
              amount: numberProduct,
              image: productDetail?.image,
              price: valuePrice,
              category: valueRadio,
              product: productDetail?.categorySize.find((sizeData) => sizeData.size === valueRadio)._id,
            },
          }),
        )
        navigate("/gio-hang", { state: { listChecked: productDetail?.categorySize.find((sizeData) => sizeData.size === valueRadio)._id } });
      }else {
        dispatch(
          AddOrderProduct({
            orderItem: {
              name: productDetail?.name,
              amount: numberProduct,
              image: productDetail?.image,
              price: valuePrice,
              category: valueRadio,
              product: productDetail?._id,
            },
          }),
        )
        navigate("/gio-hang", { state: { listChecked: idProduct } });
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <IsLoadingComponent isLoading={IsLoadingProductDetail}>
      <Row>
        <Col style={{ padding: "30px" }} span={9}>
          <Slider
            {...settings1}
            asNavFor={nav2}
            ref={(slider) => (sliderRef1 = slider)}
          >
            {productDetail?.image.map((img) => (
              <>
                <WapperProductDetailImageSmall src={img} alt="image-product" />
              </>
            ))}
          </Slider>
          <Slider
            {...settings2}
            asNavFor={nav1}
            ref={(slider) => (sliderRef2 = slider)}
            slidesToShow={5}
            swipeToSlide={true}
            focusOnSelect={true}
            style={{ margin: "10px" }}
          >
            {productDetail?.image.map((img) => (
              <>
                <WapperProductDetailImageSmall src={img} alt="image-product" />
              </>
            ))}
          </Slider>
        </Col>
        <Col span={15} style={{ marginTop: "10px", paddingRight: "20px" }}>
          <WapperStyleBlockProduct>
            <WapperStyleNameProduct>
              {productDetail?.name}
            </WapperStyleNameProduct>

            <div>
              <Rate
                allowHalf
                defaultValue={productDetail?.rating}
                style={{ fontSize: "15px", color: "yellow", marginTop: "4px" }}
              />

              <span>(Xem 5 đánh giá) | Đã bán 34</span>
            </div>

            <WapperStylePriceProduct>
              <WapperStyleTextPriceProduct>
                {!valueRadio && productDetail?.categorySize.length === 1
                  ? convertPrice(productDetail?.categorySize[0].price)
                  : !valueRadio && productDetail?.categorySize.length > 1
                    ? `${convertPrice(productDetail?.categorySize[0].price)} - ${convertPrice(productDetail?.categorySize[productDetail?.categorySize.length - 1].price)}`
                    : valueRadio &&
                        productDetail?.categorySize.find(
                          (sizeData) => sizeData.size === valueRadio,
                        )
                      ? convertPrice(
                          productDetail?.categorySize.find(
                            (sizeData) => sizeData.size === valueRadio,
                          ).price,
                        )
                      : ""}
              </WapperStyleTextPriceProduct>
            </WapperStylePriceProduct>
          </WapperStyleBlockProduct>

          <WapperStyleBlockProductBottom>
            <WapperStyleAddressProduct>
              <div className="addressheader">Thông tin vận chuyển</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <span>Giao đến : </span>
                  <span className="address">
                    427 Kinh Dương Vương, Quận Liên Chiểu, Tp Đà Nẵng
                  </span>
                </div>
                <div>
                  <span style={{ color: "rgb(10, 104, 255)" }}>Đổi</span>
                </div>
              </div>
            </WapperStyleAddressProduct>
          </WapperStyleBlockProductBottom>

          <WapperStyleBlockProductBottom>
            <div
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "150%",
                margin: "0",
              }}
            >
              Số Lượng
            </div>
            <div>
              <Space wrap>
                <InputNumber
                  size="large"
                  min={1}
                  max={100000}
                  defaultValue={1}
                  onChange={onChange}
                  value={numberProduct}
                />
              </Space>
            </div>
            {productDetail?.categorySize.length > 1 ? (
            <>
            <div
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "150%",
                margin: "0",
              }}
            >
              size
            </div>
            <div>
              <Radio.Group onChange={onChangeRadio} value={valueRadio}>
                {productDetail?.categorySize.map((sizeData) => (
                  <Radio value={sizeData.size}>{sizeData.size}</Radio>
                ))}
              </Radio.Group>
            </div>
            </>
          ) : ""}
          </WapperStyleBlockProductBottom>

          <WapperStyleButtonAddProduct
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ marginRight: "10px", width: "100%" }}>
              <Button
                style={{
                 backgroundColor: !valueRadio && productDetail?.categorySize.length === 1 ?
                 "rgb(255, 66, 78)" : 
                 (productDetail?.categorySize.length > 1 && !valueRadio ? "#ccc" : "rgb(255, 66, 78)"),
                  height: "60px",
                  width: "100%",
                  marginTop: "10px",
                  color: "#fff",
                }}
                disabled= {!valueRadio && productDetail?.categorySize.length === 1 ?
                 false : 
                 (productDetail?.categorySize.length > 1 && !valueRadio ? true : false)
                 }
                icon={<ShoppingCartOutlined />}
                onClick={hangleBuyProduct}
              >
                Mua ngay
              </Button>
              <ModalComponentLogin
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
              />
            </div>

            <div style={{ marginRight: "10px", width: "100%" }}>
              <Button
                style={{ height: "60px", width: "100%", marginTop: "10px" }}
                icon={<ShoppingCartOutlined />}
                className="buttonAddProduct"
              >
                Mua trước trả sau
              </Button>
            </div>

            <div style={{ width: "100%" }}>
              <Button
                style={{ height: "60px", width: "100%", marginTop: "10px" }}
                icon={<ShoppingCartOutlined />}
                className="buttonAddProduct"
                onClick={hangleAddCartProduct}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </WapperStyleButtonAddProduct>
        </Col>
      </Row>
    </IsLoadingComponent>
  );
}
