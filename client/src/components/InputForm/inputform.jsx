import React, { useState } from 'react'
import {Input} from 'antd'

export default function InputForm(props) {

    const {placeholder, size, ...rests} = props
    const handleOnchangeInput = (e) => {
      props.onChange(e.target.value)
    }
  return (
    <>
    <Input placeholder={placeholder} value={props.value} size= {size} {...rests} onChange={handleOnchangeInput} />
    </>
  )
}
