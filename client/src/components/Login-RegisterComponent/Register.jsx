import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm/inputform";
import InputFormPassword from "../../components/InputForm/inputPassword";
import ButtonFrom from "../../components/ButtonSearch/Button";
import { Image, Input } from "antd";
import product1 from "../../assets/font-end/imgs/Product/product1.png";
import { useMutationHooks } from "../../hooks/UseMutationHook";
import IsLoadingComponent from '../LoadComponent/Loading'
import { UserService } from "../../services";
import {
  success,
  error,
  warning,
} from "../../components/MessageComponents/Message";
import {useQuery} from '@tanstack/react-query'

export default function Register() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleOnchangeName = (value) => {
    setName(value)
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
  const { data, isLoading, isSuccess, isError } = mutation;
  console.log(mutation)
  useEffect(() => {
    if (data?.status == 200) {
      success();
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhone('');
    } else if (data?.status == "ERR") {
      error();
    }
  }, [data?.status]);
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
    <div style={{ margin: "10px" }}>
      <div>
        <label htmlFor="Name">Họ và Tên</label>
        <InputForm
          placeholder="Họ và tên"
          style={{ marginBottom: "5px" }}
          value={name}
          onChange={handleOnchangeName}
        />
      </div>
      <div>
        <label htmlFor="Email">Email</label>
        <InputForm
          placeholder="email"
          style={{ marginBottom: "5px" }}
          value={email}
          onChange={handleOnchangeEmail}
        />
      </div>
      <div>
        <label htmlFor="Email">Mật khẩu</label>
        <InputFormPassword
          placeholder="Mật Khẩu"
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
          style={{ marginBottom: "5px" }}
          value={password}
          onChange={handleOnchangePassword}
        />
      </div>
      <div>
        <label htmlFor="Email">Nhập lại mật khẩu</label>
        <InputFormPassword
          placeholder="Nhập lại mật khẩu"
          visibilityToggle={{
            visible: passwordVisible1,
            onVisibleChange: setPasswordVisible1,
          }}
          style={{ marginBottom: "5px" }}
          value={confirmPassword}
          onChange={handleOnchangeConfirmPassword}
        />
      </div>
      <div>
        <label htmlFor="Email">Số điện thoại</label>
        <InputForm
          placeholder="Số điện thoại"
          style={{ marginBottom: "5px" }}
          value={phone}
          onChange={handleOnchangePhone}
        />
      </div>

      {data?.status === "ERR" && (
        <div style={{ color: "red", fontSize: "14px", paddingTop: "10px" }}>
          {data?.message}
        </div>
      )}

      {data?.status === 200 && (
        <div style={{ color: "#4fba69", fontSize: "14px", paddingTop: "10px" }}>
          {data?.message}
        </div>
      )}
      <IsLoadingComponent isLoading={isLoading}>
      <ButtonFrom
        disabled={
          !name.length ||
          !phone.length ||
          !email.length ||
          !password.length ||
          !confirmPassword.length
        }
        onClick={handleSignUp}
        size={40}
        styleButton={{
          background:
            !name.length ||
            !phone.length ||
            !email.length ||
            !password.length ||
            !confirmPassword.length
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
      </IsLoadingComponent>
    </div>
  );
}
