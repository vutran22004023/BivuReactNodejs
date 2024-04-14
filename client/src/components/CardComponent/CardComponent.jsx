import React from "react";
import { Card } from "antd";
import "../../assets/font-end/css/Home.css";
import { StyleNameProduct,
   WrapperReporText,
   WrapperPriceText,
   WrapperDisscountText,
   WapperCardStyled,
   
   } from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';





const CardComponent =(props) => {
  const {counInStock, description, image, name, price,rating,type,discount,selled,id} = props
  const navigate = useNavigate()
  const handleDetailsProduct =(id) => {
    navigate(`/chi-tiet/${id}`)
  }
  return (
    <Card
      hoverable
      onClick={()=> handleDetailsProduct(id)}
      bodyStyle={{padding:'5px'}}
      cover={
        <img
          alt="example"
          loading="lazy"
          src={image}
          className="w-full h-[150px] md:h-[250px]"
        />
      }
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReporText>
        <span>{rating}</span>
        <span>
          <StarFilled
            style={{ fontSize: "12px", color: "yellow", marginTop: "4px" }}
          />
        </span>
        <span>| Đã Bán 1000+</span>
      </WrapperReporText>
      <WrapperPriceText>
      <span>{price.toLocaleString()} đ</span>
        <span><WrapperDisscountText>-5%</WrapperDisscountText></span>
      </WrapperPriceText>
    </Card>
  );

}

const CardLoading =() =>{
  return (
    <WapperCardStyled
      hoverable
      bodyStyle={{ padding: "13px" }}
      className="movie--isloading"
      cover={
        <div className="loading-image"></div>
      }
    >
      <StyleNameProduct><div className="loading-main-text"></div></StyleNameProduct>
      <WrapperReporText>
      <div className="loading-text-container">
        <div className="loading-main-text"></div>
        <div className="loading-sub-text"></div>
      </div>
      </WrapperReporText>
      <WrapperPriceText>
        <div className="loading-main-text"></div>
        <div className="loading-sub-text"></div>
      </WrapperPriceText>
    </WapperCardStyled>
  );
}

CardComponent.CardLoading = CardLoading

export default CardComponent;
