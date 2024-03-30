import React from "react";
import { Card } from "antd";
const { Meta } = Card;
import { StyleNameProduct,
   WrapperReporText,
   WrapperPriceText,
   WrapperDisscountText,
   WapperCardStyled,
   
   } from "./style";
import { StarFilled } from "@ant-design/icons";
export default function CardConponent(props) {
  const {counInStock, description, image, name, price,rating,type,discount,selled} = props
  return (
    <WapperCardStyled
      hoverable
      bodyStyle={{ padding: "13px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
        <span>{price} đ</span>
        <span><WrapperDisscountText>-5%</WrapperDisscountText></span>
      </WrapperPriceText>
    </WapperCardStyled>
  );
}
