import React from "react";
import { Card } from "antd";
import "../../assets/font-end/css/Home.css";
import {
   
   WapperCardStyled,
   
   } from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { convertPrice } from "../../utils";





const CardComponent =(props) => {
  const {counInStock, description, image, name, price,rating,type,discount,selled,id,categorySize, slug} = props
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
      className="w-full "
      cover={
        <img
          alt="example"
          loading="lazy"
          src={image}
          className="w-full h-[130px] md:h-[250px]"
          disabled={true}
        />
      }
    >
      <div className=" block h-[33px] overflow-hidden md:h-auto">
        <div className="text-[11px] font-normal leading-4 md:text-[14px]">{name}</div>
      </div>
      <div className="text-[10px] md:text-[12px]"> 
        <span>{rating}</span>
        <span>
          <StarFilled className="text-[10px] md:text-[12px] text-yellow-500 mt-[4px]"
            
          />
        </span>
        <span>| Đã Bán {selled || null}+</span>
      </div>
      <div className="text-[10px] md:text-[16px] text-red-500 font-semibold flex">
      <span>{convertPrice(categorySize[0].price)}</span>
        <span><div className="ml-[3px] text-[10px] md:text-[12px] font-medium">-5%</div></span>
      </div>
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
      <div>
      <div className="loading-text-container">
        <div className="loading-main-text"></div>
        <div className="loading-sub-text"></div>
      </div>
      </div>
      <WrapperPriceText>
        <div className="loading-main-text"></div>
        <div className="loading-sub-text"></div>
      </WrapperPriceText>
    </WapperCardStyled>
  );
}

CardComponent.CardLoading = CardLoading

export default CardComponent;
