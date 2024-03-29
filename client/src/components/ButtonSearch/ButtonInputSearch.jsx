import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React from "react";

export default function ButtonInputSearch(props) {
  const {
    size,
    placeholder,
    textButton,
    backgroundColorInput = "#fff",
    backgroundColorButton = "#60609B",
    colorButton = '#fff',
    bordered
  } = props;

  return (
    <div style={{ display: "flex" }}>
      <Input size ={size}
        placeholder={placeholder}
        borderRadius = 'none'
        className="input-no-border-radius"
        style={{backgroundColor: backgroundColorInput,borderRadius: 'none'}}
        />

        <Button size ={size}
         style={{backgroundColor:backgroundColorButton, color: colorButton}}
           icon={<SearchOutlined />}
           className="button-no-border-radius"
           >{textButton}</Button>
    </div>
  );
}
