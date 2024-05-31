import styled from "styled-components";
import { Col, Row ,Radio } from 'antd';

export const WapperCategory = styled(Row)`
    flex-wrap: nowrap;
    padding: 10px;
`

export const CustomRadioButton = styled(Radio.Button)`
  margin-right: 5px;
  border-radius: 0;
  border: none;
  &:hover {
    background-color: #40a9ff; /* Màu nền khi hover */
    color: white;
  }

  &.ant-radio-button-wrapper-checked {
    background-color: #096dd9; /* Màu nền khi được chọn */
    color: white;
  }
  
`;