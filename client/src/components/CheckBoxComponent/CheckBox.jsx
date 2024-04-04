import React from 'react'
import { Checkbox } from 'antd';
export default function CheckBox({ props,options,defaultValue,value, ...rests}) {
  return (
    <>
        <Checkbox.Group options={options} defaultValue={defaultValue}  />
    </>
  )
}
