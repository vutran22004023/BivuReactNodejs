import React, { useState, useEffect } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/inputform";
import ButtonFrom from "../../components/ButtonSearch/Button";
import InputFormPassword from "../../components/InputForm/inputPassword";
import { Image, Space, Input } from "antd";
import product1 from "../../assets/font-end/imgs/Product/product1.png";
import { UserService} from "../../services/index.js";
import { useMutationHooks } from "../../hooks/UseMutationHook.js";
import Loading from "../../components/LoadComponent/Loading.jsx";
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
import {
  success,
  error,
  warning,
} from "../../components/MessageComponents/Message";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/Slides/userSlide.js";
export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  //Api login
  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (data?.status == 200) {
      success();
      navigate("/");
      localStorage.setItem('access_Token', JSON.stringify(data?.access_Token))
      document.cookie = `access_Token=${data?.access_Token}`;
    }else if(data?.status == 'ERR') {
      error()
    }
  },[isSuccess]);

  // const handleGetDetailsUser  = async (id, token) => {
  //   const res = await UserService.getDetailUser(id,token)
  //   dispatch(updateUser({...res?.data, access_Token: token}))
  // }

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
    });
    console.log(mutation)
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm
            placeholder="Email"
            style={{ marginBottom: "5px" }}
            value={email}
            onChange={handleOnchangeEmail}
          />
          <InputFormPassword
            placeholder="Password"
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            value={password}
            onChange={handleOnchangePassword}
          />
          {data?.status == "ERR" && (
            <div style={{ color: "red", fontSize: "14px", paddingTop: "10px" }}>
              {data?.message}
            </div>
          )}
          {/* <Loading isLoading  ={isPending}> */}
          <ButtonFrom
            onClick={handleSignUp}
            disabled={!email.length || !password.length}
            size={40}
            styleButton={{
              background:
                !email.length || !password.length ? "#ccc" : "rgb(255, 57,69)",
              height: "40px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              margin: " 26px 0 10px",
            }}
            textButton={"Đăng nhập"}
          ></ButtonFrom>
          {/* </Loading> */}
          <p>
            <WrapperTextLight>Quên mật khẩu</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{" "}
            <WrapperTextLight to={"/register"}>Tạo tài khoản</WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image src={product1} preview={false} height={203} width={203} />
          <h4>Mua sắm tại Bi Vũ</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
}
