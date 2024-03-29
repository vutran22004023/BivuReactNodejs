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
export default function CardConponent() {
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
      <StyleNameProduct>Iphone</StyleNameProduct>
      <WrapperReporText>
        <span>4.96</span>
        <span>
          <StarFilled
            style={{ fontSize: "12px", color: "yellow", marginTop: "4px" }}
          />
        </span>
        <span>| Đã Bán 1000+</span>
      </WrapperReporText>
      <WrapperPriceText>
        <span>1.000.0000 đ</span>
        <span><WrapperDisscountText>-5%</WrapperDisscountText></span>
      </WrapperPriceText>
    </WapperCardStyled>
  );
}
