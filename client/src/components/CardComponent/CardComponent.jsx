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
import { convertPrice } from "../../utils";





const CardComponent =(props) => {
  const {counInStock, description, image, name, price,rating,type,discount,selled,id,categorySize, slug} = props
  console.log(id,slug)
  const navigate = useNavigate()
  const handleDetailsProduct =(id,slug) => {
    navigate(`/chi-tiet/${id}/${slug}`)
  }
  return (
    <Card
      // hoverable= {counInStock !== 0 ? true: false}
      hoverable= {true}
      // onClick={()=> counInStock !== 0 && handleDetailsProduct(id)}
      onClick={() => handleDetailsProduct(id,slug)}
      bodyStyle={{padding:'5px'}}
      // style={{display: counInStock === 0 ? 'none': ''}}
      // className={counInStock === 0 ? "cursor-not-allowed" : ''}
      // style={{backgroundColor: counInStock === 0 ? '#ccc' :'#fff',}}
      style={{backgroundColor: '#fff'}}
      cover={
        <img
          alt="example"
          loading="lazy"
          src={image}
          className="w-full h-[150px] md:h-[250px]"
          disabled={true}
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
        <span>| Đã Bán {selled || null}+</span>
      </WrapperReporText>
      <WrapperPriceText>
      <span>{convertPrice(categorySize[0].price)}</span>
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
