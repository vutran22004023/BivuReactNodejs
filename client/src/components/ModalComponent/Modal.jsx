import React from 'react'
import {Modal} from 'antd'
export default function ModalComponent({isOpen= false, children, ...rests}) {
  return (
    <>
        <Modal open={isOpen} {...rests}>
            {children}
        </Modal>
    </>
  )
}
