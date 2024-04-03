import React, { useState, useEffect,useRef } from "react";
import { useMutationHooks } from "../../../../hooks/UseMutationHook";
import OrderTable from "../../../../components/AdminPageComponent/OrderTable";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Outlet } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Modal, Form, Input, Upload, Avatar,Space  } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { getBase64 } from "../../../../utils";
import { UploadOutlined, WarningOutlined } from "@ant-design/icons";
import { ProductService } from "../../../../services/index.js";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {Menu,MenuButton,Dropdown, MenuItem, Divider,Button,Link,Typography,Box,Breadcrumbs } from '@mui/joy';
import {
  success,
  error,
  warning,
} from "../../../../components/MessageComponents/Message";
import DrawerComponent from '../../../../components/DrawerComponent/Drawer'
import LoadingComponent from '../../../../components/LoadComponent/Loading.jsx'
import ModalComponent from '../../../../components/ModalComponent/Modal.jsx'





export default function ProductAdmin() {

  //button thêm sửa xóa
  const RowMenu = () => (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem onClick = {handleDetailProduct} >Chỉnh sửa</MenuItem>
        {/* <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem> */}
        <Divider />
        <MenuItem color="danger" onClick={handleModalDelete}>Delete</MenuItem>
      </Menu>
    </Dropdown>
  );

  // các biến dữ liệu
  const user = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    counInStock: "",
    rating: "",
    description: "",
  });
  const [stateProductDetail, setStateProductDetail] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    counInStock: "",
    rating: "",
    description: "",
  });

  const [RowSelected,setRowSelected] = useState('')

  

  //trạng thái mở modal
  const showModal = () => {
    setIsModalOpen(true);
    // form.resetFields();
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

  const handleOnchangeDetails = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
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
        queryProduct.refetch()
      }
    });
  };



//Api create product
  const mutation =  useMutationHooks(async (data) => {
    const access_Token =  user.access_Token.split("=")[1];
        const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/product/create-product`,data,{
        headers: {
            token: `Beare ${access_Token}`,
        }
    })
    return res.data
  });
  // api get all products
  const fetchProductAll = async() => {
    
    const res =  await ProductService.getAllProduct()
    return res
  }

  // api update product id
  const mutationUpdate= useMutationHooks((data) => {
    const {id, ...rests} = data;
    const access_Token =  user?.access_Token.split("=")[1];
    const res = ProductService.updatedDetailProduct(RowSelected, data,access_Token)
    return res;
  }
  )

  //api delete product
  const mutationDelete= useMutationHooks(() => {

    const access_Token =  user?.access_Token.split("=")[1];
    const res = ProductService.DeleteDetailProduct(RowSelected,access_Token)

    return res;
  })


// các biến dữ liệu
  const { data, isPending, isSuccess, isError } = mutation;
  const queryProduct = useQuery({queryKey: ['products'], queryFn: fetchProductAll, retryDelay: 1000, staleTime: 1000});
  const { isPending:isLoadingProducts, data:products } =queryProduct
  const { data: dataUpdate, isPending: dataUpdateisLoading } = mutationUpdate;
  const {data: dataDelete, isPending: dataDeleteisLoading } =mutationDelete;

  // xử lý search trong table
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
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
          color: filtered ? '#1677ff' : undefined,
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
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      ...getColumnSearchProps('price')
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      ...getColumnSearchProps('rating')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: RowMenu 
    }
  ];


  // thông báo status khi submit
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

  // thông báo status khi submit bên update
  useEffect(() => {
    if(dataUpdate?.status === 200) {
      success();
      setIsOpenDrawer(false)
    }else if(dataUpdate?.status ==='ERR') {
      error();

    }
  },[dataUpdate?.status])

  //thông báo status khi xóa product
  useEffect(() => {
    if(dataDelete?.status === 200) {
      success();
      setIsModalOpenDelete(false);
    }else if(dataDelete?.status ==='ERR') {
      error();

    }
  },[dataDelete?.status])
  
  //reset lại null sau khi create product thành công 
  useEffect(() => {
    form.setFieldsValue(stateProduct)
  },[form, stateProduct])

  


    // show  sản phẩm của id và cập nhập lại product
    const fetchGetDetailsProduct = async () => {
      const res = await ProductService.getDetailProduct(RowSelected)
      // console.log('res.data', res)
      if(res?.data) {
        setStateProductDetail ({
          name: res?.data?.name,
          image: res?.data?.image,
          type: res?.data?.type,
          price: res?.data?.price,
          counInStock: res?.data?.counInStock,
          rating: res?.data?.rating,
          description: res?.data?.description,
        })
      }
      setIsLoadingUpdate(false)
    }

    // console.log('setStateProductDetail', stateProductDetail)

    //sao khi bấm vào cập nhập thì input có thể hiện thị thông tin
    useEffect(() => {
      form.setFieldsValue(stateProductDetail);
  }, [form, stateProductDetail]);


    const handleDetailProduct = () => {
      if(RowSelected) {
        setIsLoadingUpdate(true)
        fetchGetDetailsProduct()
        setIsOpenDrawer(true)
      }
      // console.log("handleDetailProduct",RowSelected)
    }


    // xử lý khi bấm vào submit update product
    const onUpdateProduct = () => {
      mutationUpdate.mutate(stateProductDetail,{
        onSettled: () => {
          queryProduct.refetch()
        }
      })
    }


    //phần về delete product
    const handleModalDelete = () => {
      if(RowSelected) {
        setIsModalOpenDelete(true);
        console.log("handleModalDelete",RowSelected)
      }
    };
  
    const handleOkDelete = () => {
      mutationDelete.mutate(RowSelected,{
        onSettled: () => {
          queryProduct.refetch()
        }
      })
    };
  
    const handleCancelDelete = () => {
      setIsModalOpenDelete(false);
    };



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
          <LoadingComponent isLoading = {isLoading}>
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
          </LoadingComponent>
        </Modal>

        <DrawerComponent width={720} title="Chỉnh sửa thông tin sản phẩm" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} 
        extra={
          <Space>
            <Button onClick={() => setIsOpenDrawer(false)}>Cancel</Button>
            <Button onClick={onUpdateProduct} type="primary">
              Cập Nhập
            </Button>
          </Space>
        }
         >
         <LoadingComponent isLoading = {isLoadingUpdate ||dataUpdateisLoading}>
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
            <Form.Item>
              {dataUpdate?.status ==='ERR' && (
                <div
                  style={{ color: "red", fontSize: "14px", paddingTop: "10px" }}
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
                listType="picture"
                defaultFileList={stateProductDetail?.image}
                maxCount={1}
              >
                <Button style={{ marginTop: "10px" }} icon={<UploadOutlined />}>
                  Click thêm ảnh sản phẩm
                </Button>
              </Upload>
            </Form.Item>
          </Form>
          </LoadingComponent>
        </DrawerComponent>

        <ModalComponent  isOpen={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}>
        <LoadingComponent isLoading={dataDeleteisLoading}>
        <div style={{textAlign: "center"}}>
          <WarningOutlined style={{fontSize: '50px', color: 'red'}} />
          <p>bạn có chắc chắn xóa dữ liệu này không?</p>
        </div>
        </LoadingComponent>
        </ModalComponent>
        

      </Box>
      <LoadingComponent isLoading={isLoadingProducts}>
      <OrderTable products= {products}  columns= {columns} onRow={(record, rowIndex) => {
    return {
      onClick: (event) => {
        setRowSelected(record._id)
      }, 
    };
  }}  />
  </LoadingComponent>

    </>
  );
}
