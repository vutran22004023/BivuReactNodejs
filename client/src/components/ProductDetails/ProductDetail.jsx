import { Col, Row, Image, Space, InputNumber, Button,Rate } from "antd";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { StarFilled,ShoppingCartOutlined} from "@ant-design/icons";
import Product1 from "../../assets/font-end/imgs/Product/product1.png";
import Product2 from "../../assets/font-end/imgs/Product/product2.png";
import Product3 from "../../assets/font-end/imgs/Product/product3.png";
import Product4 from "../../assets/font-end/imgs/Product/product4.png";
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
} from "./style";
import {ProductService} from '../../services/index'
import {useQuery} from '@tanstack/react-query'
import IsLoadingComponent from '../LoadComponent/Loading'
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

export default function ProductDetail({idProduct}) {
  const[numberProduct, setNumberProduct] = useState(1)
  const onChange = (value) => {
    setNumberProduct(value + 1 )
    console.log(numberProduct)
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
    const id = context?.queryKey[1]
    
    if(id) {
      const res = await ProductService.getDetailProduct(id)
      return res.data
    }
  }

  const {data: productDetail, isLoading: IsLoadingProductDetail} = useQuery({queryKey: ['products-detail', idProduct], queryFn: fetchGetDetailsProduct, enabled: !!idProduct});


  return (
    <IsLoadingComponent isLoading={IsLoadingProductDetail}>
    <Row>
      <Col style={{ padding: "30px" }} span={9}>
        <Slider
          {...settings1}
          asNavFor={nav2}
          ref={(slider) => (sliderRef1 = slider)}
        >
          <WapperProductDetailImageSmall src={Product1} alt="image-product" />
          <WapperProductDetailImageSmall src={Product2} alt="image-product" />
          <WapperProductDetailImageSmall src={Product3} alt="image-product" />
          <WapperProductDetailImageSmall src={Product4} alt="image-product" />
          <WapperProductDetailImageSmall src={Product4} alt="image-product" />
          <WapperProductDetailImageSmall src={Product4} alt="image-product" />
          <WapperProductDetailImageSmall src={Product4} alt="image-product" />
        </Slider>
        <Slider
          {...settings2}
          asNavFor={nav1}
          ref={(slider) => (sliderRef2 = slider)}
          slidesToShow={6}
          swipeToSlide={true}
          focusOnSelect={true}
          style={{ margin: "10px" }}
        >
          <WapperProductDetailImageSmall src={Product1} alt="image-product" />
          <WapperProductDetailImageSmall src={Product2} alt="image-product" />
          <WapperProductDetailImageSmall src={Product3} alt="image-product" />
          <WapperProductDetailImageSmall src={Product4} alt="image-product" />
          <WapperProductDetailImageSmall src={Product4} alt="image-product" />
          <WapperProductDetailImageSmall src={Product4} alt="image-product" />
          <WapperProductDetailImageSmall src={Product4} alt="image-product" />
        </Slider>
      </Col>
      <Col span={15} style={{ marginTop: "10px", paddingRight: "20px" }}>
        <WapperStyleBlockProduct>
          <WapperStyleNameProduct>
          {productDetail?.name}
          </WapperStyleNameProduct>

          <div>
          <Rate allowHalf  defaultValue={productDetail?.rating} style={{ fontSize: "15px", color: "yellow", marginTop: "4px" }} />

            <span>(Xem 5 đánh giá) | Đã bán 34</span>
          </div>

          <WapperStylePriceProduct>
            <WapperStyleTextPriceProduct>{productDetail?.price.toLocaleString()} đ</WapperStyleTextPriceProduct>
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
        </WapperStyleBlockProductBottom>

        <WapperStyleButtonAddProduct style={{display: 'flex',justifyContent:'center'}}>
        <div style={{marginRight: '10px', width: '100%'}}>
        <Button 
         style={{backgroundColor: 'rgb(255, 66, 78)', height: '60px',width: '100%', marginTop: '10px', color: '#fff'}}
           icon={<ShoppingCartOutlined />}
           >Mua ngay</Button>
        </div>

        <div style={{marginRight: '10px',width: '100%'}}>
        <Button 
         style={{ height: '60px',width: '100%', marginTop: '10px'}}
           icon={<ShoppingCartOutlined />}
           className="buttonAddProduct"
           >Mua trước trả sau</Button>
        </div>

        <div style={{width: '100%'}}> 
        <Button 
         style={{ height: '60px',width: '100%', marginTop: '10px'}}
           icon={<ShoppingCartOutlined />}
           className="buttonAddProduct"
           >Thêm vào giỏ hàng</Button>
        </div>
        </WapperStyleButtonAddProduct>
      </Col>
    </Row>
    </IsLoadingComponent>
  );
}
