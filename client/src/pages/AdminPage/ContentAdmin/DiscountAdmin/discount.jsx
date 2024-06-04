import React, {useState, useEffect,useRef} from 'react'
import {Outlet} from 'react-router-dom'
import { Modal, Form, Input, Upload, Avatar,Space,InputNumber,DatePicker  } from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import {Menu,MenuButton,Dropdown, MenuItem, Divider,Button,Link,Typography,Box,Breadcrumbs } from '@mui/joy';
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckBoxComponent from '../../../../components/CheckBoxComponent/CheckBox'
import { UploadOutlined,WarningOutlined } from '@ant-design/icons';
import { getBase64 } from "../../../../utils.js";
import { DiscountService } from '../../../../services';
import { useMutationHooks } from "../../../../hooks/UseMutationHook.js";
import LoadingComponent from '../../../../components/LoadComponent/Loading.jsx'
import { useSelector, useDispatch } from "react-redux";
import OrderTable from "../../../../components/AdminPageComponent/OrderTable.jsx";
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import moment from 'moment';
import {
    success,
    error,
    warning,
  } from "../../../../components/MessageComponents/Message.jsx";
import {useQuery} from '@tanstack/react-query'
import DrawerComponent from '../../../../components/DrawerComponent/Drawer.jsx'
import ModalComponent from '../../../../components/ModalComponent/Modal.jsx'

export default function discount() {
  const [form] = Form.useForm();
  const RowMenu = () => (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem onClick = {handleDetailUser} >Chỉnh sửa</MenuItem>
          {/* <MenuItem>Rename</MenuItem>
          <MenuItem>Move</MenuItem> */}
          <Divider />
          <MenuItem color="danger" onClick={handleModalDelete}>Delete</MenuItem>
        </Menu>
      </Dropdown>
    );
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
        sorter: (a, b) => a.name - b.name,
        ...getColumnSearchProps('name')
      },
      {
        title: 'Phần trăm giảm giá',
        dataIndex: 'discountPercent',
        sorter: (a, b) => a.discountPercent - b.discountPercent,
        ...getColumnSearchProps('discountPercent'),
        render: (text) => `${text} %`
      },
      {
        title: 'Số tiền giảm giá',
        dataIndex: 'discountAmount',
        sorter: (a, b) => a.discountPercent - b.discountPercent,
        ...getColumnSearchProps('discountAmount'),
        render: (text) => `${text} đ`
      },
      {
        title: 'Số lượng voucher',
        dataIndex: 'quantity',
        render: (text) => {
          return (
            <span
              style={{
                color: text > 0 ? '' : '#3adc48',
                fontWeight: 500
              }}
            >
              {text > 0 ? text : 'Hết lượt'}
            </span>
          );
        },
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        render: (text) => {
          const isPaid = text === true;
          return (
            <span
              style={{
                color: isPaid ? '#3adc48' : 'red',
                fontWeight: 500
              }}
            >
              {isPaid ? 'Đang hoạt động' : 'Hết voucher'}
            </span>
          );
        },
      },
      {
        title: 'Ngày bắt đầu',
        dataIndex: 'startDate',
      },
      {
        title: 'Ngày kết thúc',
        dataIndex: 'endDate',
      },   
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: RowMenu 
      }
    ];

  //checkbox modal create use
  const user = useSelector((state) => state.user);
  const pages = useSelector((state) => state.pagination);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [RowSelected,setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [typePage,setTypePage] = useState(0)
  
  useEffect(() => {
    if (pages) { // Đảm bảo pages không phải là undefined hoặc null
        setTypePage(pages.page)
    }
}, [pages?.page]);

const inittial = () => (
  {
    name: '',
    discountPercent: '',
    startDate: '',
    endDate: '',
    discountAmount:  0,
    status: false,
    quantity:  0,
    description: ''
}
)
  const [stateDiscount, setStateDiscount] = useState(inittial)
  const [stateDiscountDetail, setStateDiscountDetail] = useState(inittial)
  const disabledDate = (current) => {
    return current && current < dayjs().endOf('day');
  }
  const handleOnchangesNumber = (value,text) => {
    if(text === 'discountPercent') {
      setStateDiscount ({
        ...stateDiscount,
        discountPercent: value
      })
    }else if(text === 'discountAmount') {
      setStateDiscount ({
        ...stateDiscount,
        discountAmount: value
      })
    }else if(text === 'quantity') {
      setStateDiscount ({
        ...stateDiscount,
        quantity: value
      })
    }
  }

  const handleOnchangesNumberDetail = (value,text) => {
    if(text === 'discountPercent') {
      setStateDiscountDetail ({
        ...stateDiscountDetail,
        discountPercent: value
      })
    }else if(text === 'discountAmount') {
      setStateDiscountDetail ({
        ...stateDiscountDetail,
        discountAmount: value
      })
    }else if(text === 'quantity') {
      setStateDiscountDetail ({
        ...stateDiscountDetail,
        quantity: value
      })
    }
  }
  const handleDate = (value, dateString) => {
    
    setStateDiscount ({
      ...stateDiscount,
      startDate: dateString[0],
      endDate: dateString[1],
    })
  }
  const handleOnchanges = (e) => {
    setStateDiscount({
          ...stateDiscount,
          [e.target.name] : e.target.value,
      })
  }

  const handleOnchangesDetail = (e) => {
    setStateDiscountDetail({
        ...stateDiscountDetail,
        [e.target.name] : e.target.value,
    })
}




  // begin bật tắt modal add user
  const showModal = () => {
      setIsModalOpen(true);
  }

  const handleOk = () => {
      onFinish()
  }
  const handleCancel = () => {
      setIsModalOpen(false);
  }
  const onFinish =() => {
    mutationCreactDiscount.mutate(stateDiscount)
      // if(data?.status === 200) {
      //     setIsModalOpen(false);
      // }
  }
  const onFinishFailed = () => {
      setIsModalOpen(false);
  }
  // end bật tắt modal add user



    // begin Xử lý api create, getAllUser, getUserDetail, UpdateUserDetail user api
  const mutationCreactDiscount = useMutationHooks ((data) => {
      const {...rests} = data;
      const res = DiscountService.createDiscount(data)
      return res
  })

  const fetchUserAll = async() => {
      const res =await DiscountService.getAllDiscount()
      return res
  }

  const mutationUpdate = useMutationHooks ((data) => {
      const {id,...rests} = data;
      const res = DiscountService.updateDiscount(RowSelected,data)
      return res
  })

  const mutationDelete = useMutationHooks(() => {
      const access_Token =  user.access_Token.split("=")[1];
      const res = DiscountService.DeleteDiscount(RowSelected,access_Token )
      return res
  })


  // end Xử lý api create, getAllUser user api

  // các biên show dữ liệu ra client
  const queryDisCount = useQuery({queryKey: ['AllDiscount'], queryFn: fetchUserAll, retryDelay: 1000, staleTime: 1000});
  const {data,isLoading} = mutationCreactDiscount;
  const {data:Discounts, isLoading: isLoadingUserAll} = queryDisCount
  const dataAllDiscount = Discounts?.data
  const {data:DiscountsUpdateDetail,isLoading: isLoadingUpdateUserDetail} = mutationUpdate
  const {data:DeleteUser, isLoading: isLoadingDeleteUser} = mutationDelete
  // const {data:dataDeleteMany, isLoading: dataDeleteisLoadingMany} =mutationDeleteMany
  // show status khi submit dữ liệu tới server
  useEffect(() => {
      if(data?.status === 200) {
          success()
          setStateDiscount(inittial)
          setIsModalOpen(false);
      }else if(data?.status === 'ERR') {
          error()
      }
  },[data?.status])

  useEffect(() => {
      if(DiscountsUpdateDetail?.status === 200) {
          success()
      }else if(DiscountsUpdateDetail?.status === 'ERR') {
          error()
      }
  }, [DiscountsUpdateDetail?.data])



  useEffect(() => {
      if(DeleteUser?.status === 200) {
          success()
          setIsModalOpenDelete(false)
      }else if(DeleteUser?.status === 'ERR') {
          error()
      }
  }, [DeleteUser?.status])
  //reset khi submit thành công trả về input null
  useEffect(() => {
      form.setFieldsValue(stateDiscount)
    },[form, stateDiscount])

  const handleDetailUser = () => {
      if(RowSelected) {
          setIsLoadingUpdate(true)
          fetchGetDetailsUser()
          setIsOpenDrawer(true)
      }
  }



  const handleDateDetail = (value, dateString) => {
    
    setStateDiscountDetail ({
      ...stateDiscountDetail,
      startDate: dateString[0],
      endDate: dateString[1],
    })
  }
  const fetchGetDetailsUser = async () => {
      const res =await DiscountService.getDetailDiscount(RowSelected)
      if(res?.data) {
          setStateDiscountDetail({
              name:res?.data?.name,
              discountPercent:res?.data?.discountPercent,
              startDate:res?.data?.startDate,
              endDate:res?.data?.endDate,
              discountAmount:res?.data?.discountAmount,
              quantity:res?.data?.quantity,
              description:res?.data?.description
          })
      }
      setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateDiscountDetail);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateDiscountDetail, isModalOpen]);

  // submit update lại user
  const onButtonUpdateDiscountDetail = () => {
      mutationUpdate.mutate(stateDiscountDetail,{
          onSettled: () => {
            queryDisCount.refetch()
          }
        })
  }


  //bengin modal delete user 
  const handleModalDelete =() => {
      if(RowSelected) {
          setIsModalOpenDelete(true)
      }
  }

  const handleOkDelete = () => {
      mutationDelete.mutate({
          onSettled: () => {
            queryDisCount.refetch()
          }
        })
  }

  const handleCancelDelete = () =>  {
      setIsModalOpenDelete(false)
  }
  //end modal delete user


  //Truyền dữ liệu many id 




return (
  <>
      <Outlet />
      <Box sx={{
      position: 'sticky',
      top: 0,
      bottom: 0,
      height: '100dvh',
      overflowY: 'auto',
      width: '100%',
      px: { xs: 2, md: 6 },
          pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
  }}>
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
          Giảm giá
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
        Giảm giá
      </Typography>
      <Button
        color="primary"
        startDecorator={<AddCircleIcon />}
        size="sm"
        onClick={showModal}
      >
        Tạo giảm giá mới
      </Button>

      {/* model addproduct */}
      <Modal
        title="Thêm voucher"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
      >
        <LoadingComponent isLoading = {isLoading}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          form= {form}
        >
          <Form.Item
            label="Tên voucher"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên voucher",
              },
            ]}
          >
            <Input
              value={stateDiscount.name}
              onChange={handleOnchanges}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Phần trăm giảm giá"
            name="discountPercent"
            rules={[
              {
                required: true,
                message: "vui lòng nhập phần trăm giảm giá",
              },
            ]}
          >
            <InputNumber
              defaultValue={stateDiscount.discountPercent}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value?.replace('%', '')}
              onChange={(value) =>handleOnchangesNumber(value, 'discountPercent' )}
              name="discountPercent"
            />
          </Form.Item>

          <Form.Item
            label="Thời gian voucher"
            rules={[
              {
                required: true,
                message: "vui lòng nhập thời gian voucher",
              },
            ]}
          >
          <RangePicker 
            showTime={{
          format: 'HH:mm',
        }}
        disabledDate={disabledDate}
        format="YYYY-MM-DD HH:mm"
            onChange={handleDate}
          />
          </Form.Item>

          <Form.Item
            label="số tiền giảm giá"
            name="discountAmount"
          >
            <InputNumber
              defaultValue={stateDiscount.discountAmount}
              min={0}
              name="discountAmount"
              formatter={(value) => `${value}đ`}
              parser={(value) => value?.replace('đ', '')}
              onChange={(value) =>handleOnchangesNumber(value, 'discountAmount' )}
            />
          </Form.Item>

          <Form.Item
            label="Số lượng giảm giá"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng giảm giá ",
              },
            ]}
          >
          <InputNumber
              min={0}
              defaultValue={stateDiscount.quantity}
              onChange={(value) =>handleOnchangesNumber(value, 'quantity' )}
              name="quantity"
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
          >
            <TextArea
              value={stateDiscount.description}
              onChange={handleOnchanges}
              name="description"
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
        </Form>
        </LoadingComponent>
      </Modal>

      <DrawerComponent width={720} title="Chỉnh sửa thông tin người dùng" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} 
      extra={
        <Space>
          <Button onClick={() => setIsOpenDrawer(false)}>Cancel</Button>
          <Button onClick={onButtonUpdateDiscountDetail} type="primary">
            Cập Nhập
          </Button>
        </Space>
      }
       >
       <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            form= {form}
          >
        <Form.Item
            label="Tên voucher"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên voucher",
              },
            ]}
          >
            <Input
              value={stateDiscountDetail.name}
              onChange={handleOnchangesDetail}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Phần trăm giảm giá"
            name="discountPercent"
            rules={[
              {
                required: true,
                message: "vui lòng nhập phần trăm giảm giá",
              },
            ]}
          >
            <InputNumber
              defaultValue={stateDiscountDetail.discountPercent}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value?.replace('%', '')}
              onChange={(value) =>handleOnchangesNumberDetail(value, 'discountPercent' )}
              name="discountPercent"
            />
          </Form.Item>

          <Form.Item
            label="Thời gian voucher"
            rules={[
              {
                required: true,
                message: "vui lòng nhập thời gian voucher",
              },
            ]}
          >
          <RangePicker 
            showTime={{
              format: 'HH:mm',
            }}
            disabledDate={disabledDate}
            format="YYYY-MM-DD HH:mm"
            value={[dayjs(stateDiscountDetail.startDate, 'YYYY-MM-DD HH:mm'),dayjs(stateDiscountDetail.endDate, 'YYYY-MM-DD HH:mm')]}
            onChange={handleDateDetail}
          />
          </Form.Item>

          <Form.Item
            label="số tiền giảm giá"
            name="discountAmount"
          >
            <InputNumber
              defaultValue={stateDiscountDetail.discountAmount}
              min={0}
              name="discountAmount"
              formatter={(value) => `${value}đ`}
              parser={(value) => value?.replace('đ', '')}
              onChange={(value) =>handleOnchangesNumberDetail(value, 'discountAmount' )}
            />
          </Form.Item>

          <Form.Item
            label="Số lượng giảm giá"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng giảm giá ",
              },
            ]}
          >
          <InputNumber
              min={0}
              defaultValue={stateDiscountDetail.quantity}
              onChange={(value) =>handleOnchangesNumberDetail(value, 'quantity' )}
              name="quantity"
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
          >
            <TextArea
              value={stateDiscountDetail.description}
              onChange={handleOnchangesDetail}
              name="description"
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
          </Form>
      </DrawerComponent>

      <ModalComponent  isOpen={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}>
      <LoadingComponent isLoading={isLoadingDeleteUser}>
      <div style={{textAlign: "center"}}>
        <WarningOutlined style={{fontSize: '50px', color: 'red'}} />
        <p>bạn có chắc chắn xóa dữ liệu này không?</p>
      </div>
      </LoadingComponent>
      </ModalComponent>
      


      <LoadingComponent isLoading={isLoadingUserAll}>
    <OrderTable
    products={dataAllDiscount}
    // total={Discounts?.total}
    // pageCurrent={Discounts?.pageCurrent}
    // totalPages={Discounts?.totalPage}
    
    columns= {columns} 
    onRow={(record, rowIndex) => {
      return {
    onClick: (event) => {
      setRowSelected(record._id)
    }, 
  };
}} 
 />
</LoadingComponent>
    </Box>
    </Box>
  </>
)
}
