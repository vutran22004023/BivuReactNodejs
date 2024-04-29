import React from 'react'
import { Image } from "antd";
import {WrapperContainerLeft,WrapperContainerRight,WrapperTextLight} from './style'
import {Modal} from 'antd'
import LoginComponent from "../Login-RegisterComponent/Login"
export default function ModalLogin(props) {
    const {isModalOpen ,handleOk, handleCancel} = props
  return (
    <div>
        <Modal open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer= {false} width={950}>
          <div
        style={{
          width: "900px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          {/* login componment */}
          <LoginComponent />
          <p>
            <WrapperTextLight>Quên mật khẩu</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{" "}
            <WrapperTextLight>Tạo tài khoản</WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image 
          // src={product1}
           preview={false} height={203} width={203} />
          <h4>Mua sắm tại Bi Vũ</h4>
        </WrapperContainerRight>
      </div>
      </Modal>
    </div>
  )
}
