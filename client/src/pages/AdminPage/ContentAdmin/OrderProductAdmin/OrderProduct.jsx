import React, {useState, useEffect,useRef} from 'react'

import { Modal, Form, Input, Upload, Avatar,Space  } from "antd";

import {Button,Link,Typography,Box,Breadcrumbs } from '@mui/joy';
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { OrderProduct } from '../../../../services';
import { useMutationHooks } from "../../../../hooks/UseMutationHook.js";
import LoadingComponent from '../../../../components/LoadComponent/Loading.jsx'
import { useSelector } from "react-redux";
import OrderTable from "../../../../components/AdminPageComponent/OrderTable.jsx";
import { SearchOutlined } from '@ant-design/icons';

import {
    success,
    error,
    warning,
  } from "../../../../components/MessageComponents/Message.jsx";
import {useQuery} from '@tanstack/react-query'
import DrawerComponent from '../../../../components/DrawerComponent/Drawer.jsx'
import ModalComponent from '../../../../components/ModalComponent/Modal.jsx'


export default function PrderProduct() {
  const searchInput = useRef(null);
  const [RowSelected,setRowSelected] = useState('')
  const [openModal,setOpenModal] = useState(false)
  const handleCancelModal = () =>  {
    setOpenModal(false)
}
  const user = useSelector((state) => state.user);
  const fetchOrderProduct = async () => {
    const access_Token =  user.access_Token.split("=")[1];
    const res = await OrderProduct.getAllOrderProducts(access_Token)
    return res
  }

  const mutationsGetDetailOrderProduct = useMutationHooks(async(id) => {
    const access_Token =  user.access_Token.split("=")[1];
    const res = await OrderProduct.getDetailOrderProduct(id,access_Token)
    return res
  })

  const mutationsUpdateOrderProduct = useMutationHooks(async(data) => {
    const access_Token =  user.access_Token.split("=")[1];
    const {confirmation_Order,isDelivered} = data
    const res = await OrderProduct.updateOrderProduct(RowSelected,data,access_Token)
    return res
  })

  const queryUser = useQuery({queryKey: ['OrderProduct'], queryFn: fetchOrderProduct, retryDelay: 1000, staleTime: 1000});
  const {data: getOrderDetailProduct, isLoading: isLoadingOrderDetailProduct} = mutationsGetDetailOrderProduct
  const {data: getAllOrderProduct} = queryUser
  const {data: updateOrderProduct} = mutationsUpdateOrderProduct
  useEffect(() => {
    if(updateOrderProduct?.status === 200) {
      success('Cập nhập thành công')
    }
  },[updateOrderProduct])
  const RowconFirmationOrder = (record) => {
    if (record.confirmation_Order === false) {
      return <Button  sx={{backgroundColor: 'red',
      '&:hover': {
        backgroundColor: 'darkred', // Thay đổi màu khi hover
      },}} onClick={handleButtonComfirOrder}>Xác nhận đơn hàng</Button>;
    }
    else if (record.confirmation_Order === true && record.isDelivered === true && record.isPaid === true) {
      return <Button   sx={{backgroundColor: '#3adc48',
      '&:hover': {
        backgroundColor: '#24b532', // Thay đổi màu khi hover
      },}}   onClick={handleButtonComfirOrder}>Đơn hàng đã hoàn thành</Button>;
    }
    else if (record.confirmation_Order === true && record.isDelivered === true) {
      return <Button   sx={{backgroundColor: '#e7b624b9',
      '&:hover': {
        backgroundColor: '#e7b62491', // Thay đổi màu khi hover
      },}}   onClick={handleButtonComfirOrder}>Đơn hàng đã giao xong</Button>;
    }
    else if(record.confirmation_Order === true){
      return <Button  sx={{backgroundColor: '#3361f6',
      '&:hover': {
        backgroundColor: '#3360f693', // Thay đổi màu khi hover
      },}}   onClick={handleButtonComfirOrder}>Đã xác nhận đơn hàng</Button>;
    }
    return null;
  };

  const handleButtonComfirOrder = () => {
      mutationsGetDetailOrderProduct.mutate(RowSelected)
      setOpenModal(true)
  }

  const handleOkUploadOrder = ()=> {
    mutationsUpdateOrderProduct.mutate({confirmation_Order:true})
    setOpenModal(false)
  }
  const handleOkUploadOrderconfirmation = () => {
    mutationsUpdateOrderProduct.mutate({confirmation_Order:false})
    setOpenModal(false)
  }

  const handleOkUploadOrderDeliveredtrue = () => {
    mutationsUpdateOrderProduct.mutate({isDelivered:true})
    setOpenModal(false)
  }
  const handleOkUploadOrderDeliveredfalse = () => {
    mutationsUpdateOrderProduct.mutate({isDelivered:false})
    setOpenModal(false)
  }
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
  });  
  const columns = [
    {
      title: 'Họ và Tên',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName - b.userName,
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps('phone')
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        sorter: (a, b) => a.address - b.address,
        ...getColumnSearchProps('address')
    },
    {
      title:'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title:'Giá vận chuyển',
      dataIndex: 'shippingPrice',
      sorter: (a, b) => a.shippingPrice - b.shippingPrice,
      render: (text) => `${text} VND`
    },
    {
      title:'Tổng tiền hàng ',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (text) => `${text} VND`
    },
    {
      title:'Trạng thái thanh toán ',
      dataIndex: 'isPaid',
      render: (text) => {
        const isPaid = text === true;
        return (
          <span
            style={{
              color: isPaid ? '#3adc48' : 'red',
              fontWeight: 500
            }}
          >
            {isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
          </span>
        );
      },
    },
    {
      title:'Trạng thái Giao hàng ',
      dataIndex: 'isDelivered',
      render: (text) => {
        const isDelivered = text === true;
        return (
          <span
            style={{
              color: isDelivered ? '#3adc48' : 'red',
              fontWeight: 500
            }}
          >
            {isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}
          </span>
        );
      },
    },
    {
      title: 'Xác Nhận đơn hàng',
      key: 'operation',
      fixed: 'right',
      width: 150,
      render: (text, record) => RowconFirmationOrder(record),
    },
    // {
    //   title: 'Action',
    //   dataIndex: 'Order_confirmation',
    //   render: RowMenu 
    // }
  ];

  const dataTable = getAllOrderProduct?.data.length && getAllOrderProduct?.data?.map((order) => {
    return {
      ...order,
      key: order._id,
      userName: order?.shippingAddress?.fullName,
      address: order?.shippingAddress?.address,
      phone: order?.shippingAddress?.phone,
    }
  })
  

  return (
    <div>
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
              Đơn hàng
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
            Đơn hàng
          </Typography>
        </Box>

        <OrderTable
          products={dataTable}
          // dataDeleteisLoadingMany={dataDeleteisLoadingMany}
          // total={Users?.total}
          // pageCurrent={Users?.pageCurrent}
          // totalPages={Users?.totalPage}
          columns={columns}
          // handleDeleteMany= {handleDeleteMany}
          scroll={{
            x: 1800,
          }}
          expandable={{
            expandedRowRender: (record) => (
              <table className="text-center">
                <thead>
                  <tr>
                    <th></th>
                    <th>Ảnh sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Số Lượng</th>
                    <th>Giá sản phẩm</th>
                    <th>Thành Tiền</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {record.oderItems?.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <img className="h-[70px] w-[80px]" src={item.image} />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.amount}</td>
                      <td>{item.price} VND</td>
                      <td>{item.amount * item.price} VND</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ),
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </Box>
      <ModalComponent
        title="Chi tiết đơn hàng"
        isOpen={openModal}
        onCancel={handleCancelModal}
        footer={[
          <>
            <Button
              key="back"
              onClick={handleCancelModal}
              style={{ marginRight: "5px" }}
            >
              Đóng
            </Button>
            {getOrderDetailProduct?.data.isDelivered=== true ? (
              <Button
                key="back"
                sx={{
                  backgroundColor: "red",
                  marginRight: "5px",
                  "&:hover": {
                    backgroundColor: "darkred", // Thay đổi màu khi hover
                  },
                }}
                onClick={handleOkUploadOrderDeliveredfalse}
              >
                Chưa giao hàng
              </Button>
            ) : (
              <Button
                key="back"
                style={{ marginRight: "5px" }}
                onClick={handleOkUploadOrderDeliveredtrue}
              >
                Đã giao hàng
              </Button>
            )}

            {getOrderDetailProduct?.data.confirmation_Order === true ? (
              <Button
                sx={{
                  backgroundColor: "red",
                  "&:hover": {
                    backgroundColor: "darkred", // Thay đổi màu khi hover
                  },
                }}
                onClick={handleOkUploadOrderconfirmation}
              >
                Hủy xác nhận đơn hàng
              </Button>
            ) : (
              <Button key="back" onClick={handleOkUploadOrder}>
                Xác Nhận đơn hàng
              </Button>
            )}
          </>,
        ]}
      >
        <LoadingComponent isLoading={isLoadingOrderDetailProduct}>
          <div>
            <p>
              <strong>ID:</strong> {getOrderDetailProduct?.data._id}
            </p>
            <p>
              <strong>Người đặt:</strong>{" "}
              {getOrderDetailProduct?.data?.shippingAddress.fullName}
            </p>
            <p>
              <strong>Địa chỉ:</strong>{" "}
              {getOrderDetailProduct?.data?.shippingAddress.address}
            </p>
            <p>
              <strong>Số điện thoại:</strong>{" "}
              {getOrderDetailProduct?.data.shippingAddress.phone}
            </p>
            <p>
              <strong>Lời nhắn của khách hàng:</strong>{" "}
              {getOrderDetailProduct?.data.note_customers}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(getOrderDetailProduct?.data.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {new Date(getOrderDetailProduct?.data.updatedAt).toLocaleString()}
            </p>
            <p>
              <strong>Trạng thái xác nhận:</strong>{" "}
              {getOrderDetailProduct?.data.confirmation_Order ? (
                <span className="text-[#3adc37]">Đã xác nhận</span>
              ) : (
                <span className="text-[red]">Chưa xác nhận</span>
              )}
            </p>
            <p>
              <strong>Trạng thái giao hàng:</strong>{" "}
              {getOrderDetailProduct?.data.isDelivered ? (
                <span className="text-[#3adc37]">Đã giao</span>
              ) : (
                <span className="text-[red]">Chưa giao</span>
              )}
            </p>
            <p>
              <strong>Trạng thái thanh toán:</strong>{" "}
              {getOrderDetailProduct?.data.isPaid ? (
                <span className="text-[#3adc37]">Đã thanh toán</span>
              ) : (
                <span className="text-[red]">Chưa thanh toán</span>
              )}
            </p>
            <table
              border="1"
              cellpadding="10"
              cellspacing="0"
              style={{
                width: "100%",
                border: "1px solid #000",
                borderRadius: "5px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              <thead>
                <tr style={{ border: "1px solid #000" }}>
                  <th></th>
                  <th>Tên sản phẩm</th>
                  <th>Phân Loại</th>
                  <th>Số lượng</th>
                  <th>Giá (VND)</th>
                  <th>Thành tiền (VND)</th>
                </tr>
              </thead>
              <tbody>
                {getOrderDetailProduct?.data.oderItems.map((item, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000" }}>{index + 1}</td>
                    <td style={{ border: "1px solid #000" }}>{item.name}</td>
                    <td style={{ border: "1px solid #000" }}>
                      {item.category}
                    </td>
                    <td style={{ border: "1px solid #000" }}>{item.amount}</td>
                    <td style={{ border: "1px solid #000" }}>
                      {item.price} VND
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {item.amount * item.price} VND
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    style={{ border: "1px solid #000" }}
                    colspan="5"
                    align="right"
                  >
                    <strong>Phí ship:</strong>
                  </td>
                  <td style={{ border: "1px solid #000" }}>
                    {getOrderDetailProduct?.data.shippingPrice} VND
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ border: "1px solid #000" }}
                    colspan="5"
                    align="right"
                  >
                    <strong>Tổng Số Tiền:</strong>
                  </td>
                  <td style={{ border: "1px solid #000" }}>
                    {getOrderDetailProduct?.data.totalPrice} VND
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ border: "1px solid #000" }}
                    colspan="5"
                    align="right"
                  >
                    <strong>Phương thức giao hàng</strong>
                  </td>
                  <td style={{ border: "1px solid #000", textAlign: "left" }}>
                    {getOrderDetailProduct?.data.paymentMethod}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </LoadingComponent>
      </ModalComponent>
    </div>
  );
}
