import React, { useState, useEffect } from "react";
import {
  WrapperHeader,
  WrapperContentProfile,
  WapperLabel,
  WapperInput,
  WapperUpload
} from "./style";
import InputForm from "../../../../components/InputForm/inputform";
import ButtonFrom from "../../../../components/ButtonSearch/Button";
import { useSelector, useDispatch } from "react-redux";
import { UserService } from "../../../../services/index";
import { useMutationHooks } from "../../../../hooks/UseMutationHook";
import {
  success,
  error,
  warning,
} from "../../../../components/MessageComponents/Message";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Col, Row, Upload } from "antd";
import product1 from "../../../../assets/font-end/imgs/Product/product1.png";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../../utils";
export default function ProFileUser() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [email, isEmail] = useState(user?.email);
  const [name, isName] = useState(user?.name);
  const [phone, isPhone] = useState(user?.phone);
  const [address, isAddress] = useState(user?.address);
  const [avatar, isAvatar] = useState(user?.avatar);

  const mutation = useMutationHooks((data) => {
    const { id, access_Token, ...rests } = data;
    let accessTokenValue = access_Token.split("=")[1];
    UserService.updateUser(id, data, accessTokenValue);
  });
  useEffect(() => {
    isEmail(user?.email);
    isName(user?.name);
    isPhone(user?.phone);
    isAddress(user?.address);
    isAvatar(user?.avatar);
  }, [user]);

  const handleOnchangeName = (value) => {
    isName(value);
  };
  const handleOnchangeEmail = (value) => {
    isEmail(value);
  };
  const handleOnchangePhone = (value) => {
    isPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    isAddress(value);
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    isAvatar(file.preview);
  };
  const { data, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess) {
      handleGetDetailsUser(user?.id, user?.access_Token);
      success();
    }
  }, [isSuccess, isError]);

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      name,
      email,
      phone,
      address,
      avatar,
      access_Token: user?.access_Token,
    });
  };

  const handleGetDetailsUser = async (id, token) => {
    let accessTokenValue = token.split("=")[1];
    const res = await UserService.getDetailUser(id, accessTokenValue);
    dispatch(updateUser({ ...res?.data, access_Token: token }));
  };

  return (
    <div style={{ width: "1270px", margin: "20px 110px", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <WrapperContentProfile>
        <Row>
          <Col span={8} style={{ textAlign: "center" }}>
            {avatar ? (
              <Avatar src={avatar} shape="square" size={200} />
            ) : (
                <Avatar src={product1} shape="square" size={200} />
            ) // hoặc bất kỳ phần tử nào khác bạn muốn hiển thị khi không có avatar
            }
            <WapperUpload onChange={handleOnchangeAvatar} maxCount={1}>
              <Button style={{ marginTop: "10px" }} icon={<UploadOutlined />} >
                Click to Upload
              </Button>
            </WapperUpload>
            <ButtonFrom
                onClick={handleUpdate}
                size={40}
                styleButton={{
                  background: "red",
                  height: "30px",
                  width: "100%",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
                textButton={"Cập nhật"}
              ></ButtonFrom>
          </Col>
          <Col span={16}>
            <WapperInput>
              <WapperLabel htmlFor="name">Name</WapperLabel>
              <InputForm
                id="name"
                style={{ width: "300px" }}
                placeholder="abc@gmail.com"
                value={name}
                onChange={handleOnchangeName}
              />
              <ButtonFrom
                onClick={handleUpdate}
                size={40}
                styleButton={{
                  background: "red",
                  height: "30px",
                  width: "100%",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
                textButton={"Cập nhật"}
              ></ButtonFrom>
            </WapperInput>
            <WapperInput>
              <WapperLabel htmlFor="email">Email</WapperLabel>
              <InputForm
                id="email"
                style={{ width: "300px" }}
                placeholder="abc@gmail.com"
                value={email}
                onChange={handleOnchangeEmail}
              />
              <ButtonFrom
                onClick={handleUpdate}
                size={40}
                styleButton={{
                  background: "red",
                  height: "30px",
                  width: "100%",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
                textButton={"Cập nhật"}
              ></ButtonFrom>
            </WapperInput>

            <WapperInput>
              <WapperLabel htmlFor="phone">Phone</WapperLabel>
              <InputForm
                id="phone"
                style={{ width: "300px" }}
                placeholder="abc@gmail.com"
                value={phone}
                onChange={handleOnchangePhone}
              />
              <ButtonFrom
                onClick={handleUpdate}
                size={40}
                styleButton={{
                  background: "red",
                  height: "30px",
                  width: "100%",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
                textButton={"Cập nhật"}
              ></ButtonFrom>
            </WapperInput>

            <WapperInput>
              <WapperLabel htmlFor="address">Address</WapperLabel>
              <InputForm
                id="address"
                style={{ width: "300px" }}
                placeholder="abc@gmail.com"
                value={address}
                onChange={handleOnchangeAddress}
              />
              <ButtonFrom
                onClick={handleUpdate}
                size={40}
                styleButton={{
                  background: "red",
                  height: "30px",
                  width: "100%",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
                textButton={"Cập nhật"}
              ></ButtonFrom>
            </WapperInput>
          </Col>
        </Row>
      </WrapperContentProfile>
    </div>
  );
}
