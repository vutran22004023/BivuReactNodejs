import React from 'react'

export default function Input(props) {
    const {
        size,
        placeholder,
        backgroundColorInput = "#fff",
      } = props;
  return (
    <div>
        <Input size ={size}
        placeholder={placeholder}
        borderRadius = 'none'
        className="input-no-border-radius"
        style={{backgroundColor: backgroundColorInput}}
        />
    </div>
  )
}
