import React, { useState, useEffect, useRef } from "react";
import { useMutationHooks } from "../../../../hooks/UseMutationHook.js";
import OrderTable from "../../../../components/AdminPageComponent/OrderTable.jsx";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Outlet } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Modal, Form, Input, Upload, Avatar, Space, Select, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../../utils.js";
import { UploadOutlined, WarningOutlined } from "@ant-design/icons";
import { ProductService } from "../../../../services/index.js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import {
  Menu,
  MenuButton,
  Dropdown,
  MenuItem,
  Divider,
  Button,
  Link,
  Typography,
  Box,
  Breadcrumbs,
} from "@mui/joy";
import {
  success,
  error,
  warning,
} from "../../../../components/MessageComponents/Message.jsx";
import DrawerComponent from "../../../../components/DrawerComponent/Drawer.jsx";
import LoadingComponent from "../../../../components/LoadComponent/Loading.jsx";
import ModalComponent from "../../../../components/ModalComponent/Modal.jsx";
import {renderOptions, vietnameseToSlug } from "../../../../utils.js";
import {imgDB,txtDB} from '../../../../Firebase/config.jsx'
import {v4} from 'uuid'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
export default function ProductAdmin() {
  //button thêm sửa xóa
  const RowMenu = () => (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem onClick={handleDetailProduct}>Chỉnh sửa</MenuItem>
        {/* <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem> */}
        <Divider />
        <MenuItem color="danger" onClick={handleModalDelete}>
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );

  // các biến dữ liệu
  const user = useSelector((state) => state.user);
  const pages = useSelector((state) => state.pagination);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [typeSelect, setTypeSelect] = useState("");
  const [typePage, setTypePage] = useState(0);
  const [model, setModel] = useState("");

  useEffect(() => {
    if (pages) {
      // Đảm bảo pages không phải là undefined hoặc null
      setTypePage(pages.page);
    }
  }, [pages?.page]);

  const inittial = () => ({
    name: "",
    image: [],
    type: "",
    slug: "",
    rating: "",
    description: "",
    discount: "",
    categorySize: [
      {
        size: "",
        price: "",
        counInStock: "",
      },
    ],
  });

  const handleAddInput = () => {
    setStateProduct({
      ...stateProduct,
      categorySize: [...stateProduct.categorySize, { size: "", price: "" }],
    });
  };

  const handleRemoveInput = (index) => {
    const newSize = [...stateProduct.categorySize];
    newSize.splice(index, 1);
    setStateProduct({
      ...stateProduct,
      categorySize: newSize,
    });
  };

  const [stateProduct, setStateProduct] = useState(inittial);
  console.log(stateProduct)
  const [stateProductDetail, setStateProductDetail] = useState(inittial);
  const [RowSelected, setRowSelected] = useState("");

  //trạng thái mở modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onFinish();
  };
  //trang thái đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // ochange dữ liệu khi nhập vào imput
  const handleOnchanges = (index, e, fieldName) => {
    let value = e.target.value;
    const slug = vietnameseToSlug(value);
    if (fieldName === "categorySize") {
      const newSize = [...stateProduct.categorySize];
      newSize[index][e.target.name] = e.target.value;
      setStateProduct({
        ...stateProduct,
        categorySize: newSize,
      });
    } else {
      setStateProduct({
        ...stateProduct,
        [fieldName]: e.target.value,
        slug: slug,
      });
    }
  };

  const handleOnchangeDetails = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatarDetailProduct = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetail({
      ...stateProductDetail,
      image: file.preview,
    });
  };

  const onFinish = () => {
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  //Api create product
  const mutation = useMutationHooks(async (data) => {
    const access_Token = user.access_Token.split("=")[1];
    const res = await axios.post(
      `${import.meta.env.REACT_APP_API_URL}/product/create-product`,
      data,
      {
        headers: {
          token: `Beare ${access_Token}`,
        },
      },
    );
    return res.data;
  });
  // api get all products
  const fetchProductAll = async (context) => {
    const search = "";
    const limit = "";
    const page = context.queryKey[1];
    const res = await ProductService.getAllProduct(limit, search, page);
    return res;
  };

  // api update product id
  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rests } = data;
    const access_Token = user?.access_Token.split("=")[1];
    const res = ProductService.updatedDetailProduct(
      RowSelected,
      data,
      access_Token,
    );
    return res;
  });

  //api delete product
  const mutationDelete = useMutationHooks(() => {
    const access_Token = user?.access_Token.split("=")[1];
    const res = ProductService.DeleteDetailProduct(RowSelected, access_Token);

    return res;
  });
  // api delete many products
  const mutationDeleteMany = useMutationHooks((data) => {
    const { access_Token, ...id } = data;
    const res = ProductService.DeleteManyProduct(id, access_Token);
    return res;
  });

  const handleDeleteMany = (ids) => {
    // console.log('_id', {_id})
    const access_Token = user?.access_Token.split("=")[1];
    mutationDeleteMany.mutate(
      { id: ids, access_Token: access_Token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      },
    );
  };

  const fetchTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };

  // các biến dữ liệu
  const {
    data,
    isLoading: isLoadingCreateProduct,
    isSuccess,
    isError,
  } = mutation;
  const queryProduct = useQuery({
    queryKey: ["products", typePage],
    queryFn: fetchProductAll,
    retryDelay: 1000,
    staleTime: 1000,
  });
  const { isLoading: isLoadingProducts, data: products } = queryProduct;
  const dataAllProduct = products?.data;
  const { data: dataUpdate, isLoading: dataUpdateisLoading } = mutationUpdate;
  const { data: dataDelete, isLoading: dataDeleteisLoading } = mutationDelete;
  const { data: dataDeleteMany, isLoading: dataDeleteisLoadingMany } =
    mutationDeleteMany;
  const { data: productType, isLoading: isLoadingProductType } = useQuery({
    queryKey: ["productsType"],
    queryFn: fetchTypeProduct,
  });

  // xử lý search trong table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Thoát
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      ...getColumnSearchProps("price"),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      ...getColumnSearchProps("rating"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: RowMenu,
    },
  ];

  // thông báo status khi submit
  const [form] = Form.useForm();
  useEffect(() => {
    if (data?.status === 200) {
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
    }
    if (data?.status === "ERR") {
      error();
    }
  }, [data?.status]);

  // thông báo status khi submit bên update
  useEffect(() => {
    if (dataUpdate?.status === 200) {
      success();
      setIsOpenDrawer(false);
    } else if (dataUpdate?.status === "ERR") {
      error();
    }
  }, [dataUpdate?.status]);

  useEffect(() => {
    if (dataDeleteMany?.status === 200) {
      success();
    } else if (dataDeleteMany?.status === "ERR") {
      error();
    }
  }, [dataDeleteMany?.status]);

  //thông báo status khi xóa product
  useEffect(() => {
    if (dataDelete?.status === 200) {
      success();
      setIsModalOpenDelete(false);
    } else if (dataDelete?.status === "ERR") {
      error();
    }
  }, [dataDelete?.status]);

  //reset lại null sau khi create product thành công
  useEffect(() => {
    form.setFieldsValue(stateProduct);
  }, [form, stateProduct]);

  // show  sản phẩm của id và cập nhập lại product
  const fetchGetDetailsProduct = async () => {
    const res = await ProductService.getDetailProduct(RowSelected);
    if (res?.data) {
      setStateProductDetail({
        name: res?.data?.name,
        image: res?.data?.image,
        type: res?.data?.type,
        price: res?.data?.price,
        counInStock: res?.data?.counInStock,
        rating: res?.data?.rating,
        description: res?.data?.description,
        discount: res?.data?.discount,
      });
    }
    setIsLoadingUpdate(false);
  };

  // console.log('setStateProductDetail', stateProductDetail)

  //sao khi bấm vào cập nhập thì input có thể hiện thị thông tin
  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetail);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateProductDetail, isModalOpen]);

  const handleDetailProduct = () => {
    if (RowSelected) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct();
      setIsOpenDrawer(true);
    }
    // console.log("handleDetailProduct",RowSelected)
  };

  // xử lý khi bấm vào submit update product
  const onUpdateProduct = () => {
    mutationUpdate.mutate(stateProductDetail, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  //phần về delete product
  const handleModalDelete = () => {
    if (RowSelected) {
      setIsModalOpenDelete(true);
      // console.log("handleModalDelete",RowSelected)
    }
  };

  const handleOkDelete = () => {
    mutationDelete.mutate(RowSelected, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleChangeSelect = (value) => {
    if (value !== "add_type") {
      setStateProduct({
        ...stateProduct,
        type: value,
      });
    } else {
      setTypeSelect(value);
    }
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  console.log(previewImage)
  // const handleChange = async ({fileList}) => {
  //     const imgs = ref(imgDB, `Imgs/${v4()}`);
  //     const uploadTaskSnapshot = await uploadBytes(imgs, fileList.originFileObj);
  //     const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
  //     setStateProduct({ ...stateProduct, image: downloadURL });

  // };
  const handlePreview = async ({ fileList }) => {
    if (Array.isArray(fileList)) {
      fileList.forEach(async (file) => {
        setPreviewImage(file);
        setPreviewOpen(true);
      });
    } else {
      console.error("fileList is not an array");
    }
  };
  
  const handleChange = async ({ fileList }) => {
    if (fileList) {
      try {
        const downloadURLs = await Promise.all(fileList.map(async (item) => {
          const imgs = ref(imgDB, `Imgs/${v4()}`);
          try {
            const uploadTaskSnapshot = await uploadBytes(imgs, item.originFileObj);
            return getDownloadURL(uploadTaskSnapshot.ref);
          } catch (error) {
            console.error("Error uploading file: ", error);
            return null;
          }
        }));
        // Lọc bỏ các giá trị null (nếu có) khỏi mảng downloadURLs
        const filteredURLs = downloadURLs.filter(url => url !== null);
        setStateProduct({ ...stateProduct, image: filteredURLs });
      } catch (error) {
        console.error("Error handling files: ", error);
      }
    } else {
      console.error("fileList is not an array");
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

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
          width={600}
        >
          <LoadingComponent isLoading={isLoadingCreateProduct}>
            <Form
              name="basic"
              // labelCol={{
              //   span: 6,
              // }}
              // wrapperCol={{
              //   span: 17,
              // }}
              style={{
                maxWidth: 800,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              form={form}
            >
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập Tên sản phẩm",
                  },
                ]}
              >
                <Input
                  value={stateProduct.name}
                  onChange={(e) => handleOnchanges(null, e, "name")}
                  name="name"
                />
              </Form.Item>
              <Form.Item
                label="Đường dẫn"
                name="slug"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  value={stateProduct.slug}
                  onChange={(e) => handleOnchanges(null,e, "slug")}
                  name="slug"
                  disabled 
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
                <Select
                  onChange={handleChangeSelect}
                  name={productType !== "add_type" ? "type" : ""}
                  value={productType?.type}
                  options={renderOptions(productType?.data)}
                />
                {typeSelect === "add_type" ? (
                  <Input
                    style={{ marginTop: "5px" }}
                    value={stateProduct.type}
                    onChange={handleOnchanges}
                    name="type"
                  />
                ) : (
                  <Input
                    style={{ display: "none" }}
                    value={stateProduct.type}
                    onChange={handleOnchanges}
                    name="type"
                  />
                )}
              </Form.Item>

              {stateProduct?.categorySize?.map((item, index) => (
                <div key={index}>
                  <div className="flex">
                    <Form.Item
                      label={`Kích thước ${index}`}
                      name={`size${index}`}
                      rules={[
                        {
                          required: true,
                          message: "vui lòng nhập giá size",
                        },
                      ]}
                      className="w-full"
                    >
                      <Input
                        name="size"
                        value={item.size}
                        onChange={(e) =>
                          handleOnchanges(index, e, "categorySize")
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      label={`Giá ${index}`}
                      name={`price${index}`}
                      rules={[
                        {
                          required: true,
                          message: "vui lòng nhập giá sản phẩm",
                        },
                      ]}
                      className="ml-2 w-full"
                    >
                      <Input
                        name="price"
                        value={item.price}
                        onChange={(e) =>
                          handleOnchanges(index, e, "categorySize")
                        }
                      />
                    </Form.Item>
                    <Form.Item>
                      {index === 0 ? (
                        ""
                      ) : (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemoveInput(index)}
                        >
                          Xóa
                        </Button>
                      )}
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label={`Số lượng kho${index}`}
                      name={`counInStock${index}`}
                      rules={[
                        {
                          required: true,
                          message: "vui lòng nhập giá sản phẩm",
                        },
                      ]}
                      className="ml-2 w-full"
                    >
                      <Input
                        name="counInStock"
                        value={item.counInStock}
                        onChange={(e) =>
                          handleOnchanges(index, e, "categorySize")
                        }
                      />
                    </Form.Item>
                  </div>
                </div>
              ))}
              <Form.Item className="ml-[100px]">
                <Button onClick={handleAddInput} type="primary">
                  Thêm size
                </Button>
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
                {/* <Input
                  value={stateProduct.description}
                  onChange={(e) => handleOnchanges(null, e, "description")} 
                  name="description"
                /> */}
                <FroalaEditor
                  model={stateProduct.description}
                  onModelChange={(value) =>
                    handleOnchanges(null, { target: { value } }, "description")
                  }
                  config={{
                    placeholderText: "Nhập mô tả vào đây",
                    charCounterCount: true,
                  }}
                  tag="textarea"
                  name="description"
                />
              </Form.Item>
              <Form.Item
                label="Giảm giá sản phẩm"
                name="discount"
                rules={[
                  {
                    required: false,
                    message: "vui lòng nhập giá sản phẩm",
                  },
                ]}
              >
                <Input
                  value={stateProduct.discount}
                  onChange={(e) => handleOnchanges(null, e, "discount")}
                  name="discount"
                />
              </Form.Item>

              <div className="text-[red]">
                (Ảnh đầu tiên upload vào sẽ không đc lưu vui lòng thêm ảnh kế
                tiếp hoặc xóa ảnh đầu tiên đi)(Tối đa 10 ảnh)
              </div>
              <Form.Item
                name="image"
                label="Ảnh sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng thêm ảnh sản phẩm",
                  },
                ]}
              >
                <Upload
                  // onChange={handleOnchangeAvatar}
                  onChange={handleChange}
                  listType="picture-card"
                  fileList={stateProduct?.image?.uid}
                  onPreview={handlePreview}
                >
                  {/* {stateProduct?.image.length ? null : uploadButton} */}
                  {uploadButton}
                </Upload>

                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </Form.Item>

              <Form.Item>
                {data?.status === "ERR" && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      paddingTop: "10px",
                    }}
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
            </Form>
          </LoadingComponent>
        </Modal>

        <DrawerComponent
          width={720}
          title="Chỉnh sửa thông tin sản phẩm"
          isOpen={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          extra={
            <Space>
              <Button onClick={() => setIsOpenDrawer(false)}>Cancel</Button>
              <Button onClick={onUpdateProduct} type="primary">
                Cập Nhập
              </Button>
            </Space>
          }
        >
          <LoadingComponent isLoading={isLoadingUpdate || dataUpdateisLoading}>
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
              form={form}
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
                  value={stateProductDetail.name}
                  onChange={handleOnchangeDetails}
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
                  value={stateProductDetail.type}
                  onChange={handleOnchangeDetails}
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
                  value={stateProductDetail.description}
                  onChange={handleOnchangeDetails}
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
                  value={stateProductDetail.price}
                  onChange={handleOnchangeDetails}
                  name="price"
                />
              </Form.Item>

              <Form.Item
                label="Giảm giá sản phẩm"
                name="discount"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập giảm giá sản phẩm",
                  },
                ]}
              >
                <Input
                  value={stateProductDetail.discount}
                  onChange={handleOnchangeDetails}
                  name="discount"
                />
              </Form.Item>
              <Form.Item>
                {dataUpdate?.status === "ERR" && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      paddingTop: "10px",
                    }}
                  >
                    {dataUpdate?.message}
                  </div>
                )}

                {/* {dataUpdate?.status === 200 && (
                <div
                  style={{
                    color: "#4fba69",
                    fontSize: "14px",
                    paddingTop: "10px",
                  }}
                >
                  {dataUpdate?.message}
                </div>
              )} */}
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
                  onChange={handleOnchangeAvatarDetailProduct}
                  listType="picture-card"
                  defaultFileList={stateProductDetail?.image}
                  maxCount={1}
                >
                  <Button
                    style={{ marginTop: "10px" }}
                    icon={<UploadOutlined />}
                  >
                    Click thêm ảnh sản phẩm
                  </Button>
                </Upload>
              </Form.Item>
            </Form>
          </LoadingComponent>
        </DrawerComponent>

        <ModalComponent
          isOpen={isModalOpenDelete}
          onOk={handleOkDelete}
          onCancel={handleCancelDelete}
        >
          <LoadingComponent isLoading={dataDeleteisLoading}>
            <div style={{ textAlign: "center" }}>
              <WarningOutlined style={{ fontSize: "50px", color: "red" }} />
              <p>bạn có chắc chắn xóa dữ liệu này không?</p>
            </div>
          </LoadingComponent>
        </ModalComponent>

        <LoadingComponent isLoading={isLoadingProducts }>
          <OrderTable
            handleDeleteMany={handleDeleteMany}
            dataDeleteisLoadingMany={dataDeleteisLoadingMany}
            dataDeleteMany={dataDeleteMany}
            products={dataAllProduct}
            columns={columns}
            total={products?.total}
            pageCurrent={products?.pageCurrent}
            totalPages={products?.totalPage}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setRowSelected(record._id);
                },
              };
            }}
          />
        </LoadingComponent>
      </Box>
    </>
  );
}
