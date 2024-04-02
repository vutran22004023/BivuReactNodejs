import React, { useState, useEffect } from "react";
import { useMutationHooks } from "../../../../hooks/UseMutationHook";
import OrderTable from "../../../../components/AdminPageComponent/OrderTable";
import OrderList from "../../../../components/AdminPageComponent/OrderList";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Outlet } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Modal, Form, Input, Upload, Avatar } from "antd";
import { getBase64 } from "../../../../utils";
import { UploadOutlined } from "@ant-design/icons";
import {  ProductService } from "../../../../services/index.js";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import {
  success,
  error,
  warning,
} from "../../../../components/MessageComponents/Message";
export default function ProductAdmin() {
  const user = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    counInStock: "",
    rating: "",
    description: "",
  });

  //trạng thái mở modal
  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = () => {
    onFinish();
  };
  //trang thái đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
// ochange dữ liệu khi nhập vào imput
  const handleOnchanges = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
// xử lý phần file ảnh
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };
  const onFinish = () => {
    mutation.mutate(stateProduct);
  };

//Api react product
  const mutation =  useMutationHooks(async (data) => {
    const access_Token =  user.access_Token.split("=")[1];
        const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/product/create-product`,data,{
        headers: {
            token: `Beare ${access_Token}`,
        }
    })
    return res.data
  });
  // thông báo status khi submit
  const { data, isPending, isSuccess, isError } = mutation;
  const [form] = Form.useForm();
  useEffect(() => {
    if(data?.status === 200) {
      success();
      setStateProduct({
        name: "",
        image: "",
        type: "",
        price: "",
        counInStock: "",
        rating: "",
        description: "",
      });
      setIsModalOpen(false);
    }if(data?.status ==='ERR') {
      error();

    }
  },[data?.status])


  return (
    <>
      <Outlet />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="sm" />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none"
            color="neutral"
            href="#some-link"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href="#some-link"
            fontSize={12}
            fontWeight={500}
          >
            Dashboard
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            Orders
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Sản Phẩm
        </Typography>
        <Button
          color="primary"
          startDecorator={<AddCircleIcon />}
          size="sm"
          onClick={showModal}
        >
          Thêm sản phẩm
        </Button>

        {/* model addproduct */}
        <Modal
          title="Thêm sản phẩm"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Submit"
        >
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form= {form}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền tên sản phẩm",
                },
              ]}
            >
              <Input
                value={stateProduct.name}
                onChange={handleOnchanges}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Thể Loại"
              name="type"
              rules={[
                {
                  required: true,
                  message: "vui lòng nhập thể loại",
                },
              ]}
            >
              <Input
                value={stateProduct.type}
                onChange={handleOnchanges}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "vui lòng nhập Mô tả sản phẩm",
                },
              ]}
            >
              <Input
                value={stateProduct.description}
                onChange={handleOnchanges}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Giá sản phẩm"
              name="price"
              rules={[
                {
                  required: true,
                  message: "vui lòng nhập giá sản phẩm",
                },
              ]}
            >
              <Input
                value={stateProduct.price}
                onChange={handleOnchanges}
                name="price"
              />
            </Form.Item>
            <Form.Item>
              {data?.status ==='ERR' && (
                <div
                  style={{ color: "red", fontSize: "14px", paddingTop: "10px" }}
                >
                  {data?.message}
                </div>
              )} 

               {data?.status === 200 && (
                <div
                  style={{
                    color: "#4fba69",
                    fontSize: "14px",
                    paddingTop: "10px",
                  }}
                >
                  {data?.message}
                </div>
              )}
            </Form.Item>

            <Form.Item
              name="image"
              rules={[
                {
                  required: true,
                  message: "Vui lòng thêm ảnh sản phẩm",
                },
              ]}
            >
              <Upload
                onChange={handleOnchangeAvatar}
                listType="picture"
                defaultFileList={stateProduct?.image}
                maxCount={1}
              >
                <Button style={{ marginTop: "10px" }} icon={<UploadOutlined />}>
                  Click thêm ảnh sản phẩm
                </Button>
                {/* {stateProduct?.image && (
                <Avatar src={stateProduct?.image} shape="square" size={200} />
              )} */}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </Box>
      <OrderTable />
      <OrderList />
    </>
  );
}
