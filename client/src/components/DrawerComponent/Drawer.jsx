import React from 'react'
import { Drawer } from 'antd';
export default function DrawerComponent({title= 'Drawer',children, placement = 'right', isOpen = 'false', ...rests }) {
  return (
    <>
      <Drawer title={title} placement={placement}  open={isOpen} {...rests}>
        {children}
      </Drawer>
    </>
  )
}
