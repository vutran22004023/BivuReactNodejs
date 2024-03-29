import React from 'react'
import { Input,Button } from 'antd'
export default function ButtonForm(props) {
    const {size,
        textButton,
        styleButton,
        icon,
        ...rests
    } = props
  return (
    <div>
        <Button size ={size}
         style={styleButton}
           icon={icon}
           {...rests}
           >{textButton}</Button>
    </div>
  )
}
