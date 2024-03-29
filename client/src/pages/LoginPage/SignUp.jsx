import React, { useState,useEffect } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm/inputform";
import InputFormPassword from "../../components/InputForm/inputPassword";
import ButtonFrom from "../../components/ButtonSearch/Button";
import { Image, Input } from "antd";
import product1 from "../../assets/font-end/imgs/Product/product1.png";
import { useMutationHooks } from "../../hooks/UseMutationHook";
import { UserService } from "../../services";
import {success,error, warning} from '../../components/MessageComponents/Message';
export default function SignUp() {
  const navigate = useNavigate(); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };

  //Api login
  const mutation = useMutationHooks((data) => UserService.RegistUser(data));
  const { data, isPending,isSuccess, isError } = mutation;


  useEffect(() => {
    if(isSuccess) {
      success()
      navigate('/login')
    }else if(isError) {
      error()
    }
  },[isSuccess,isError])
  const handleSignUp = () => {
    mutation.mutate({
      name,
      email,
      password,
      confirmPassword,
      phone,
    });
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
          height: "500px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng kí tài khoản</p>
          <InputForm
            placeholder="Name"
            style={{ marginBottom: "5px" }}
            value={name}
            onChange={handleOnchangeName}
          />
          <InputForm
            placeholder="email"
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
            style={{ marginBottom: "5px" }}
            value={password}
            onChange={handleOnchangePassword}
          />
          <InputFormPassword
            placeholder="asdasdasd"
            visibilityToggle={{
              visible: passwordVisible1,
              onVisibleChange: setPasswordVisible1,
            }}
            style={{ marginBottom: "5px" }}
            value={confirmPassword}
            onChange={handleOnchangeConfirmPassword}
          />

          <InputForm
            placeholder="Phone"
            style={{ marginBottom: "5px" }}
            value={phone}
            onChange={handleOnchangePhone}
          />
          {data?.status == "ERR" && (
            <div style={{ color: "red", fontSize: "14px", paddingTop: "10px" }}>
              {data?.message}
            </div>
          )}
          <ButtonFrom
            disabled={
              !name.length||!phone.length || !email.length || !password.length || !confirmPassword.length
            }
            onClick={handleSignUp}
            size={40}
            styleButton={{
              background:
                !name.length||!phone.length || !email.length || !password.length || !confirmPassword.length
                  ? "#ccc"
                  : "rgb(255, 57,69)",
              height: "40px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              margin: " 26px 0 10px",
            }}
            textButton={"Đăng kí"}
          >
            Đăng kí
          </ButtonFrom>
          <p>
            Bạn đã có tài khoản?{" "}
            <WrapperTextLight to={"/login"}>Đăng nhập</WrapperTextLight>
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
