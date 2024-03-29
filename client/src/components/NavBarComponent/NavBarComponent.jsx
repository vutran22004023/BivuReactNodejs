import React from "react";
import {
  WrapperLabelText,
  WrapperLabelTextValue,
  WrapperLabelContent,
  WrapperLabelContentPrice,
} from "./style";
import { Checkbox, Col, Rate, Row } from "antd";
export default function NavBarComponent() {
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperLabelTextValue>{option}</WrapperLabelTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return <Checkbox value={option.value}> {option.lable}</Checkbox>;
            })}
          </Checkbox.Group>
        );

      case "star":
        return options.map((option) => {
          return (
            <div style={{ display: "flex" }}>
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                defaultValue={option}
              />
              <span>từ {option} sao</span>
            </div>
          );
        });
      case "price":
        return options.map((option) => {
          return (
            <WrapperLabelContentPrice >
              {option}
            </WrapperLabelContentPrice>
          );
        });
      default:
        return {};
    }
  };
  return (
    <div style={{padding: '15px'}}>
      <WrapperLabelText>Lable</WrapperLabelText>
      <WrapperLabelContent>
        {renderContent("text", ["Tu lanh", "TV", "May dat"])}
      </WrapperLabelContent>
      <WrapperLabelContent>
        {renderContent("checkbox", [
          { value: "a", lable: "A" },
          { value: "b", lable: "B" },
        ])}
      </WrapperLabelContent>

      <WrapperLabelContent>
        {renderContent("star", [3, 4, 5])}
      </WrapperLabelContent>

      <WrapperLabelContent>
        {renderContent("price", ["duoi 40.000", "50.000 -> 100.000"])}
      </WrapperLabelContent>
    </div>
  );
}
