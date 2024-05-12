import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link, Typography, Box, Breadcrumbs } from "@mui/joy";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Form, Input, Upload, Button } from "antd";

const { TextArea } = Input;
import { PlusOutlined } from "@ant-design/icons";
import { InformationPageService } from "../../../../services/index.js";
import { useMutationHooks } from "../../../../hooks/UseMutationHook.js";
import { useQuery } from "@tanstack/react-query";
import IsLoadingComponent from "../../../../components/LoadComponent/Loading.jsx";
import {
  success,
  error,
  warning,
} from "../../../../components/MessageComponents/Message.jsx";
import UploadComponent from '../../../../components/UploadComponent/UploadComponent.jsx'
import UploadImgManyComponent from '../../../../components/UploadComponent/UploadImgManyComponent.jsx'
export default function InforPageAdmin() {
  const inittial = () => ({
    namePage: "",
    description: "",
    logo_1: [],
    logo_2: [],
    image_slider: [],
    image_right: [],
    image_bottom: [],
    title_1: "",
    title_2: "",
    title_3: "",
    title_4: "",
    link_fb: "",
    link_tt: "",
    link_shoppee: "",
    image_qc_1: [],
    image_qc_2: [],
    image_qc_3: [],
    image_qc_4: [],
    image_qc_5: [],
    link_qc_1: "",
    link_qc_2: "",
    link_qc_3: "",
    link_qc_4: "",
    link_qc_5: "",
  });
  const [InforPageDetail, setInforPageDetail] = useState(inittial);
  console.log(InforPageDetail)
  // const [InforPage, setInforPage] = useState(inittial)

  // const handleOchangeInforTitle = (e) => {
  //   setInforPage ({
  //     ...InforPage,
  //     [e.target.name] : e.target.value,
  //   })
  // }
  const handleOchangeInforTitleDetail = (e) => {
    setInforPageDetail({
      ...InforPageDetail,
      [e.target.name]: e.target.value,
    });
  };

  const mutationcreateInforTitle = useMutationHooks(async (data) => {
    const { ...rests } = data;
    const res = await InformationPageService.createInforPage(data);
    return res;
  });

  const mutationUpdateInforTitle = useMutationHooks(async (data) => {
    const id = getDetailInforPage?.data?._id;
    const { ...rests } = data;
    const res = await InformationPageService.updateInforPage(id, data);
    return res;
  });

  const mutationGetInforDetails = async () => {
    const id = "663ef62acc49005e8db09793";
    const res = await InformationPageService.getDetailInforPage(id);
    return res;
  };

  const { data: getDetailInforPage, isLoading: isLoadingProductsLimit } =
    useQuery({
      queryKey: ["getDetailInforPage"],
      queryFn: mutationGetInforDetails,
    });
  const { data: dataUpdateInforPages, isLoading: isLoadingUpdateInforPage } =
    mutationUpdateInforTitle;
  const [form] = Form.useForm();

  useEffect(() => {
    if (getDetailInforPage) {
      setInforPageDetail({
        namePage: getDetailInforPage?.data?.namePage,
        description: getDetailInforPage?.data?.description,
        logo_1: getDetailInforPage?.data?.logo_1,
        logo_2: getDetailInforPage?.data?.logo_2,
        image_slider: getDetailInforPage?.data?.image_slider,
        image_right: getDetailInforPage?.data?.image_right,
        image_bottom: getDetailInforPage?.data?.image_bottom,
        title_1: getDetailInforPage?.data?.title_1,
        title_2: getDetailInforPage?.data?.title_2,
        title_3: getDetailInforPage?.data?.title_3,
        title_4: getDetailInforPage?.data?.title_4,
        link_fb: getDetailInforPage?.data?.link_fb,
        link_tt: getDetailInforPage?.data?.link_tt,
        link_shoppee: getDetailInforPage?.data?.link_shoppee,
        image_qc_1: getDetailInforPage?.data?.image_qc_1,
        image_qc_2: getDetailInforPage?.data?.image_qc_2,
        image_qc_3: getDetailInforPage?.data?.image_qc_3,
        image_qc_4: getDetailInforPage?.data?.image_qc_4,
        image_qc_5: getDetailInforPage?.data?.image_qc_5,
        link_qc_1: getDetailInforPage?.data?.link_qc_1,
        link_qc_2: getDetailInforPage?.data?.link_qc_2,
        link_qc_3: getDetailInforPage?.data?.link_qc_3,
        link_qc_4: getDetailInforPage?.data?.link_qc_4,
        link_qc_5: getDetailInforPage?.data?.link_qc_5,
      });
    }
  }, [getDetailInforPage]);
  // const handleButtonTitle = () => {
  //   mutationcreateInforTitle.mutate(InforPage)
  // }
  useEffect(() => {
    form.setFieldsValue(InforPageDetail);
  }, [InforPageDetail]);

  useEffect(() => {
    if (dataUpdateInforPages?.status === 200) {
      success("Cập nhập thành công");
    } else if (dataUpdateInforPages?.status === "ERR") {
      error("Cập nhật thất bại");
    }
  }, [dataUpdateInforPages?.status]);
  const handleButtonUpdateInforTitle = () => {
    mutationUpdateInforTitle.mutate(InforPageDetail);
  };


  return (
    <IsLoadingComponent isLoading={isLoadingUpdateInforPage}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          bottom: 0,
          height: "100dvh",
          overflowY: "auto",
          width: "100%",
          px: { xs: 2, md: 6 },
          pt: {
            xs: "calc(12px + var(--Header-height))",
            sm: "calc(12px + var(--Header-height))",
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
        }}
      >
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
              User
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
            Thông tin trang web
          </Typography>
        </Box>

        <Box className="block md:flex ">
          <div className="w-full rounded-lg border-[1px] border-slate-400 p-5">
            <Typography level="h4" component="h1" sx={{ marginBottom: "10px" }}>
              Tiêu đề header
            </Typography>
            <Form
              initialValues={{
                remember: true,
              }}
              labelCol={{
                span: 7,
              }}
              wrapperCol={{
                span: 17,
              }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              form={form}
            >
              <Form.Item
                label="Tiêu đề header top 1"
                name="title_1"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền header top 1",
                  },
                ]}
              >
                <Input
                  value={InforPageDetail.title_1}
                  onChange={handleOchangeInforTitleDetail}
                  name="title_1"
                />
              </Form.Item>
              <Form.Item
                label="Tiêu đề header top 2"
                name="title_2"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền điền header top 2",
                  },
                ]}
              >
                <Input
                  value={InforPageDetail.title_2}
                  onChange={handleOchangeInforTitleDetail}
                  name="title_2"
                />
              </Form.Item>
              <Form.Item
                label="Tiêu đề header top 3"
                name="title_3"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền điền header top 3",
                  },
                ]}
              >
                <Input
                  value={InforPageDetail.title_3}
                  onChange={handleOchangeInforTitleDetail}
                  name="title_3"
                />
              </Form.Item>
              <Form.Item
                label="Link facebook"
                name="link_fb"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền điền link facebook",
                  },
                ]}
              >
                <Input
                  value={InforPageDetail.link_fb}
                  onChange={handleOchangeInforTitleDetail}
                  name="link_fb"
                />
              </Form.Item>
              <Form.Item
                label="Link Tiktok"
                name="link_tt"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền điền link tiktok",
                  },
                ]}
              >
                <Input
                  value={InforPageDetail.link_tt}
                  onChange={handleOchangeInforTitleDetail}
                  name="link_tt"
                />
              </Form.Item>
              <Form.Item
                label="Link Shopper"
                name="link_shoppee"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền điền link shopper",
                  },
                ]}
              >
                <Input
                  value={InforPageDetail.link_shoppee}
                  onChange={handleOchangeInforTitleDetail}
                  name="link_shoppee"
                />
              </Form.Item>
            </Form>
            <div className="flex justify-between">
              <div></div>
              <div>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleButtonUpdateInforTitle}
                >
                  Cập Nhập
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-2 w-full rounded-lg border-[1px] border-slate-400 p-5 md:ml-3 md:mt-0">
            <Typography level="h4" component="h1" sx={{ marginBottom: "5px" }}>
              Thông tin website
            </Typography>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 19,
              }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              form={form}
            >
              <Form.Item
                label="Tên website"
                name="namePage"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền tên người dùng",
                  },
                ]}
              >
                <Input
                  value={InforPageDetail.namePage}
                  onChange={handleOchangeInforTitleDetail}
                  name="namePage"
                />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền tên người dùng",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  value={InforPageDetail.description}
                  onChange={handleOchangeInforTitleDetail}
                  name="description"
                />
              </Form.Item>
              <Form.Item label="Logo">
                <UploadComponent setInforPageDetail={setInforPageDetail} InforPageDetail={InforPageDetail} valueImge={InforPageDetail?.logo_1} amount={1} valueName="logo_1" />
              </Form.Item>
            </Form>
            <div className="flex justify-between">
              <div></div>
              <div>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleButtonUpdateInforTitle}
                >
                  Cập Nhập
                </Button>
              </div>
            </div>
          </div>
        </Box>

        <Box className="mt-5 block md:flex">
          <div className="w-full rounded-lg border-[1px] border-slate-400 p-5">
            <Typography level="h4" component="h1" sx={{ marginBottom: "10px" }}>
              Thông tin Slider
            </Typography>
            <Form
              initialValues={{
                remember: true,
              }}
              // labelCol={{
              //   span: 6,
              // }}
              // wrapperCol={{
              //   span: 18,
              // }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              form={form}
            >
              <div className="block w-full md:flex ">
                <Form.Item
                  label={<div className="block">
                    <div>Ảnh slider</div>
                    <div className="text-[red]">(Tối đa 8 ảnh)</div>
                  </div> 
                  }
                  className="w-full"
                >
                  <UploadImgManyComponent setInforPageDetail={setInforPageDetail} InforPageDetail={InforPageDetail} valueImge={InforPageDetail?.image_slider} amount={8} valueName="image_slider" />
                </Form.Item>
                <Form.Item
                  label={<div className="block">
                    <div>Ảnh kế bên phải Slider</div>
                    <div className="text-[red]">(Tối đa 2 ảnh)</div>
                  </div> 
                  }
                  className="w-full"
                >
                  <UploadImgManyComponent setInforPageDetail={setInforPageDetail} InforPageDetail={InforPageDetail} valueImge={InforPageDetail?.image_right} amount={2} valueName="image_right" />
                </Form.Item>
                <Form.Item
                  label={<div className="block">
                    <div>Ảnh bên dưới Slider</div>
                    <div className="text-[red]">(Tối đa 3 ảnh)</div>
                  </div> 
                  }
                  className="w-full"
                >
                  <UploadImgManyComponent setInforPageDetail={setInforPageDetail} InforPageDetail={InforPageDetail} valueImge={InforPageDetail?.image_bottom} amount={3} valueName="image_bottom" />
                </Form.Item>
            </div>
            </Form>

            <div className="flex justify-between">
              <div></div>
              <div>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleButtonUpdateInforTitle}
                >
                  Cập Nhập
                </Button>
              </div>
            </div>
          </div>
        </Box>

        <Box className="mt-5 block md:flex">
          <div className="w-full rounded-lg border-[1px] border-slate-400 p-5">
            <Typography level="h4" component="h1" sx={{ marginBottom: "10px" }}>
              Thông tin quảng cáo
            </Typography>
            <Form
              initialValues={{
                remember: true,
              }}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              form={form}
            >
              <div className="block w-full md:flex ">
                <Form.Item
                  label="Ảnh quảng cáo 1"
                  className="w-full"
                >
                  <UploadComponent setInforPageDetail={setInforPageDetail} InforPageDetail={InforPageDetail} valueImge={InforPageDetail?.image_qc_1} amount={1} valueName="image_qc_1" />
                </Form.Item>

                <Form.Item
                  label="Link quảng cáo 1"
                  name="link_qc_1"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền tên người dùng",
                    },
                  ]}
                  className="w-full text-center"
                  maxCount={1}
                >
                  <Input
                    value={InforPageDetail?.link_qc_1}
                    onChange={handleOchangeInforTitleDetail}
                    name="link_qc_1"
                  />
                </Form.Item>
              </div>

              <div className="block w-full md:flex ">
              <Form.Item
                  label="Ảnh quảng cáo 2"
                  className="w-full"
                >
                  <UploadComponent setInforPageDetail={setInforPageDetail} InforPageDetail={InforPageDetail} valueImge={InforPageDetail?.image_qc_2} amount={1} valueName="image_qc_2" />
                </Form.Item>

                <Form.Item
                  label="Link quảng cáo 2"
                  name="link_qc_2"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền tên người dùng",
                    },
                  ]}
                  className="w-full text-center"
                >
                  <Input
                    value={InforPageDetail?.link_qc_2}
                    onChange={handleOchangeInforTitleDetail}
                    name="link_qc_2"
                  />
                </Form.Item>
              </div>

              <div className="block w-full md:flex ">
              <Form.Item
                  label="Ảnh quảng cáo 3"
                  className="w-full"
                >
                  <UploadComponent setInforPageDetail={setInforPageDetail} InforPageDetail={InforPageDetail} valueImge={InforPageDetail?.image_qc_3} amount={1} valueName="image_qc_3" />
                </Form.Item>

                <Form.Item
                  label="Link quảng cáo 3"
                  name="link_qc_3"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền tên người dùng",
                    },
                  ]}
                  className="w-full text-center"
                >
                  <Input
                    value={InforPageDetail?.link_qc_3}
                    onChange={handleOchangeInforTitleDetail}
                    name="link_qc_3"
                  />
                </Form.Item>
              </div>

              <div className="block w-full md:flex ">
              <Form.Item
                  label="Ảnh quảng cáo 4"
                  className="w-full"
                >
                  <UploadComponent setInforPageDetail={setInforPageDetail} InforPageDetail={InforPageDetail} valueImge={InforPageDetail?.image_qc_4} amount={1} valueName="image_qc_4" />
                </Form.Item>

                <Form.Item
                  label="Link quảng cáo 4"
                  name="link_qc_4"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền tên người dùng",
                    },
                  ]}
                  className="w-full text-center"
                >
                  <Input
                    value={InforPageDetail?.link_qc_4}
                    onChange={handleOchangeInforTitleDetail}
                    name="link_qc_4"
                  />
                </Form.Item>
              </div>

              <div className="block w-full md:flex ">
              <Form.Item
                  label="Ảnh quảng cáo 5"
                  className="w-full"
                >
                  <UploadComponent setInforPageDetail={setInforPageDetail} InforPageDetail={InforPageDetail} valueImge={InforPageDetail?.image_qc_5} amount={1} valueName="image_qc_5" />
                </Form.Item>

                <Form.Item
                  label="Link quảng cáo 5"
                  name="link_qc_5"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền tên người dùng",
                    },
                  ]}
                  className="w-full text-center"
                >
                  <Input
                    value={InforPageDetail?.link_qc_5}
                    onChange={handleOchangeInforTitleDetail}
                    name="link_qc_5"
                  />
                </Form.Item>
              </div>
            </Form>

            <div className="flex justify-between">
              <div></div>
              <div>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleButtonUpdateInforTitle}
                >
                  Cập Nhập
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </IsLoadingComponent>
  );
}
