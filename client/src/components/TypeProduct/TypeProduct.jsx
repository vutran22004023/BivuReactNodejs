import React from 'react'
import {WapperHover} from  './style'
import { useNavigate } from "react-router-dom";
export default function TypeProduct({name}) {
  const navigate = useNavigate()
  const handleNavigateType = (type) => {
    // Kiểm tra nếu type là undefined hoặc không phải là một chuỗi
    if (typeof type !== 'undefined' && typeof type === 'string') {
      navigate(`/danh-muc/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '_')}`, {state: type});
    } else {
      console.error('Loại sản phẩm không hợp lệ');
    }
  };
  return (
    <WapperHover  onClick={() =>handleNavigateType(name)}>
        {name}
    </WapperHover>
  )
}
