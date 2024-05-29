import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link, Typography, Box, Breadcrumbs } from "@mui/joy";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Form, Input, Upload, Button,Space } from "antd";

const { TextArea } = Input;
import { PlusOutlined,MinusCircleOutlined } from "@ant-design/icons";
import { InformationPageService } from "../../../../services/index.js";
import { useMutationHooks } from "../../../../hooks/UseMutationHook.js";
import { useQuery } from "@tanstack/react-query";
import IsLoadingComponent from "../../../../components/LoadComponent/Loading.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  success,
  error,
  warning,
} from "../../../../components/MessageComponents/Message.jsx";
import UploadComponent from '../../../../components/UploadComponent/UploadComponent.jsx'
import UploadImgManyComponent from '../../../../components/UploadComponent/UploadImgManyComponent.jsx'
export default function InforPageAdmin() {
  const user = useSelector((state) => state.user);
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
    header_footer1: "",
    header_footer2: "",
    header_footer3: "",
    header_footer4: "",
    content_footer1: [
      {
        name: '',
      }
    ],
    content_footer2: [
      {
        name: '',
      }
    ],
    content_footer3: [
      {
        name: '',
      }
    ],
    content_footer4: [
      {
        name: '',
      }
    ],
  });
  const [InforPageDetail, setInforPageDetail] = useState(inittial);
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

  const handleOchangeInforFooter = (index, e, fieldName) => {
    let value = e.target.value;
    if(fieldName=== 'content_footer1') {
      const newSize = [...InforPageDetail.content_footer1];
      newSize[index][e.target.name] = e.target.value;
      setInforPageDetail({
        ...InforPageDetail,
        [fieldName]: newSize,
      });
    }else if (fieldName=== 'content_footer2') {
      const newSize = [...InforPageDetail.content_footer2];
      newSize[index][e.target.name] = e.target.value;
      setInforPageDetail({
        ...InforPageDetail,
        [fieldName]: newSize,
      });
    }
    else if (fieldName=== 'content_footer3') {
      const newSize = [...InforPageDetail.content_footer3];
      newSize[index][e.target.name] = e.target.value;
      setInforPageDetail({
        ...InforPageDetail,
        [fieldName]: newSize,
      });
    }
    else if (fieldName=== 'content_footer4') {
      const newSize = [...InforPageDetail.content_footer4];
      newSize[index][e.target.name] = e.target.value;
      setInforPageDetail({
        ...InforPageDetail,
        [fieldName]: newSize,
      });
    }
    else {
      setInforPageDetail({
        ...InforPageDetail,
        [fieldName]: e.target.value,
      })
    }
  }

  const mutationcreateInforTitle = useMutationHooks(async (data) => {
    const { ...rests } = data;
    const access_Token = user?.access_Token.split("=")[1];
    const res = await InformationPageService.createInforPage(data,access_Token);
    return res;
  });

  const mutationUpdateInforTitle = useMutationHooks(async (data) => {
    const id = getDetailInforPage?.data?._id;
    const { ...rests } = data;
    const access_Token = user?.access_Token.split("=")[1];
    const res = await InformationPageService.updateInforPage(id, data,access_Token);
    return res;
  });

  const mutationGetInforDetails = async () => {
    const id = "663ef62acc49005e8db09793";
    const access_Token = user?.access_Token.split("=")[1];
    const res = await InformationPageService.getDetailInforPage(id,access_Token);
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
        header_footer1: getDetailInforPage?.data?.header_footer1,
        header_footer2: getDetailInforPage?.data?.header_footer2,
        header_footer3: getDetailInforPage?.data?.header_footer3,
        header_footer4: getDetailInforPage?.data?.header_footer4,
        content_footer1: getDetailInforPage?.data?.content_footer1,
        content_footer2: getDetailInforPage?.data?.content_footer2,
        content_footer3: getDetailInforPage?.data?.content_footer3,
        content_footer4: getDetailInforPage?.data?.content_footer4,
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

  const handleAddInputDetail = (nameinput) => {
    setInforPageDetail((prevInforPageDetail) => ({
      ...prevInforPageDetail,
      [nameinput]: [
        ...(prevInforPageDetail[nameinput] || []),
        { name: '' }
      ]
    }));
  };

  const handleRemoveInputDetail = (index, nameInput) => {
    const newSize = [...InforPageDetail[nameInput]];
    newSize.splice(index, 1);
    setInforPageDetail({
      ...InforPageDetail,
      [nameInput]: newSize,
    });
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
              Thông tin page
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

        <Box
          sx={{
            display: "flex",
            mb: 1,
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "start", sm: "center" },
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop:'20px'
          }}
        >
          <Typography level="h2" component="h1">
            Thông tin footer Page
          </Typography>
        </Box>


        <Box className="mt-5 block md:flex">
          <div className="w-full rounded-lg border-[1px] border-slate-400 p-5">
            <Form
            name="basic"
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
            <Form.Item
                  label="Tiều đề footer 1"
                  name="header_footer1"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tiêu đề footer 1",
                    },
                  ]}
                  className=""
                >
                  <Input
                    value={InforPageDetail?.header_footer1}
                    onChange={(e) =>handleOchangeInforFooter(null, e, "header_footer1")}
                    name="header_footer1"
                    className=" w-full md:w-[500px]"
                  />
                </Form.Item>

                <Form.List
                name="content_footer1"
                rules={[
                  {
                    validator: async (_, categorySize) => {
                      if (!categorySize || categorySize.length < 2) {
                        return Promise.reject(
                          new Error("At least 2 passengers"),
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          label={`nội dung ${key + 1} header 1`}
                          key={key}
                          {...restField}
                          name={[name, "name"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập nội dung",
                            },
                          ]}
                          className="ml-0 md:ml-[160px]"
                        >
                          <Input
                            value={name}
                            onChange={(e) =>
                              handleOchangeInforFooter(key, e, "content_footer1")
                            }
                            name="name"
                            className=" w-full md:w-[400px]"
                          />
                        </Form.Item>
                    
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              remove(name);
                              handleRemoveInputDetail(name,"content_footer1");
                            }}
                          />
                        ) : null}
                      </Space>
                    ))}
                    <Form.Item
                    >
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                          handleAddInputDetail('content_footer1');
                        }}
                        className="ml-0 md:ml-[160px]"
                      >
                        Thêm content footer 1
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item
                  label="Tiều đề footer 2"
                  name="header_footer2"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tiêu đề footer 2",
                    },
                  ]}
                  className=""
                >
                  <Input
                    value={InforPageDetail?.header_footer2}
                    onChange={(e) =>handleOchangeInforFooter(null, e, "header_footer2")}
                    name="header_footer2"
                    className=" w-full md:w-[500px]"
                  />
                </Form.Item>

                <Form.List
                name="content_footer2"
                rules={[
                  {
                    validator: async (_, categorySize) => {
                      if (!categorySize || categorySize.length < 2) {
                        return Promise.reject(
                          new Error("At least 2 passengers"),
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          label={`nội dung ${key + 1} header 2`}
                          key={key}
                          {...restField}
                          name={[name, "name"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập nội dung",
                            },
                          ]}
                          className="ml-0 md:ml-[160px]"
                        >
                          <Input
                            value={name}
                            onChange={(e) =>
                              handleOchangeInforFooter(key, e, "content_footer2")
                            }
                            name="name"
                            className=" w-full md:w-[400px]"
                          />
                        </Form.Item>
                    
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              remove(name);
                              handleRemoveInputDetail(name,"content_footer2");
                            }}
                          />
                        ) : null}
                      </Space>
                    ))}
                    <Form.Item
                    >
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                          handleAddInputDetail('content_footer2');
                        }}
                        className="ml-0 md:ml-[160px]"
                      >
                        Thêm content footer 2
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>


              <Form.Item
                  label="Tiều đề footer 3"
                  name="header_footer3"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tiêu đề footer 3",
                    },
                  ]}
                  className=""
                >
                  <Input
                    value={InforPageDetail?.header_footer3}
                    onChange={(e) =>handleOchangeInforFooter(null, e, "header_footer3")}
                    name="header_footer3"
                    className=" w-full md:w-[500px]"
                  />
                </Form.Item>

                <Form.List
                name="content_footer3"
                rules={[
                  {
                    validator: async (_, categorySize) => {
                      if (!categorySize || categorySize.length < 2) {
                        return Promise.reject(
                          new Error("At least 2 passengers"),
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          label={`nội dung ${key + 1} header 3`}
                          key={key}
                          {...restField}
                          name={[name, "name"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập nội dung",
                            },
                          ]}
                          className="ml-0 md:ml-[160px]"
                        >
                          <Input
                            value={name}
                            onChange={(e) =>
                              handleOchangeInforFooter(key, e, "content_footer3")
                            }
                            name="name"
                            className=" w-full md:w-[400px]"
                          />
                        </Form.Item>
                    
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              remove(name);
                              handleRemoveInputDetail(name,"content_footer3");
                            }}
                          />
                        ) : null}
                      </Space>
                    ))}
                    <Form.Item
                    >
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                          handleAddInputDetail('content_footer3');
                        }}
                        className="ml-0 md:ml-[160px]"
                      >
                        Thêm content footer 3
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item
                  label="Tiều đề footer 4"
                  name="header_footer4"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tiêu đề footer 4",
                    },
                  ]}
                  className=""
                >
                  <Input
                    value={InforPageDetail?.header_footer4}
                    onChange={(e) =>handleOchangeInforFooter(null, e, "header_footer4")}
                    name="header_footer4"
                    className=" w-full md:w-[500px]"
                  />
                </Form.Item>

                <Form.List
                name="content_footer4"
                rules={[
                  {
                    validator: async (_, categorySize) => {
                      if (!categorySize || categorySize.length < 2) {
                        return Promise.reject(
                          new Error("At least 2 passengers"),
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          label={`nội dung ${key + 1} header 4`}
                          key={key}
                          {...restField}
                          name={[name, "name"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập nội dung",
                            },
                          ]}
                          className="ml-0 md:ml-[160px]"
                        >
                          <Input
                            value={name}
                            onChange={(e) =>
                              handleOchangeInforFooter(key, e, "content_footer4")
                            }
                            name="name"
                            className=" w-full md:w-[400px]"
                          />
                        </Form.Item>
                    
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              remove(name);
                              handleRemoveInputDetail(name,"content_footer4");
                            }}
                          />
                        ) : null}
                      </Space>
                    ))}
                    <Form.Item
                    >
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                          handleAddInputDetail('content_footer4');
                        }}
                        className="ml-0 md:ml-[160px]"
                      >
                        Thêm content footer 4
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
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
