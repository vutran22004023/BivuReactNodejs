import React, { useState, useEffect } from "react";
import InputForm from "../../components/InputForm/inputform";
import ButtonFrom from "../../components/ButtonSearch/Button";
import InputFormPassword from "../../components/InputForm/inputPassword";
import { Image, Space, Input } from "antd";
import { UserService} from "../../services/index.js";
import { useMutationHooks } from "../../hooks/UseMutationHook.js";
import {
    success,
    error,
    warning,
  } from "../../components/MessageComponents/Message";
  import { useNavigate } from "react-router-dom";
import IsLoadingComponent from '../LoadComponent/Loading.jsx'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
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
  const { data, isLoading: LoginIsLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (data?.status == 200) {
      success();
      navigate("/");
      window.location.reload();
      localStorage.setItem('access_Token', JSON.stringify(data?.access_Token))
      document.cookie = `access_Token=${data?.access_Token}`;
    }else if(data?.status == 'ERR') {
      error()
    }
  },[isSuccess]);


  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  // // đăng nhập bằng google
  // const [userGoogle, setUserGoogle] = useState()
  // const auth= getAuth()
  // const handleLoginWithGoogle = async () => {
  //   const provider = new GoogleAuthProvider();

  //   const res =  await signInWithPopup(auth, provider);
  //   // console.log(res);
  // }

  // useEffect(() => {
  //   const unsubcribed = auth.onIdTokenChanged((user) => {
  //     if(user?.uid) {
  //       navigate("/");
  //       // window.location.reload();
  //       localStorage.setItem('access_Token', JSON.stringify(user?.accessToken))
  //       document.cookie = `access_Token=${user?.accessToken}`;
  //       setUserGoogle(user)
  //     }
  //     userGoogle({})
  //     localStorage.clear()
  //     document.cookie = `access_Token=`;
  //   })

  //   return () => {
  //     unsubcribed()
  //   }
  // },[auth])

  // console.log('userGoogle',userGoogle)



    return (
      <div style={{ margin: "10px" }}>
        <div>
          <label htmlFor="Email" style={{ marginBottom: "5px" }}>
            Email
          </label>
          <InputForm
            placeholder="Email"
            value={email}
            onChange={handleOnchangeEmail}
          />
        </div>
        <div style={{marginTop:'10px'}}>
          <label htmlFor="Password" style={{ marginBottom: "5px" }}>
            Mật Khẩu
          </label>
          <InputFormPassword
            placeholder="Mật Khẩu"
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            value={password}
            onChange={handleOnchangePassword}
          />
        </div>
        {data?.status == "ERR" && (
            <div style={{ color: "red", fontSize: "14px", paddingTop: "10px" }}>
              {data?.message}
            </div>
          )}
          <IsLoadingComponent isLoading={LoginIsLoading}>
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
          </IsLoadingComponent>

          {/* <div style={{textAlign: 'center'}}>
            <h4>Hoặc</h4>
            <ButtonFrom
            size={40}
            styleButton={{
              background:"rgb(255, 57,69)",
              height: "40px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
            textButton={"Đăng nhập với google"}
            onClick={handleLoginWithGoogle}
          ></ButtonFrom>
          </div> */}
      </div>

    );
}