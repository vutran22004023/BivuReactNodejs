import React, {useState, useEffect,useRef} from 'react'
import {Outlet} from 'react-router-dom'
import { Modal, Form, Input, Upload, Avatar,Space, Radio  } from "antd";

import {Menu,MenuButton,Dropdown, MenuItem, Divider,Button,Link,Typography,Box,Breadcrumbs } from '@mui/joy';
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckBoxComponent from '../../../../components/CheckBoxComponent/CheckBox'
import { UploadOutlined,WarningOutlined } from '@ant-design/icons';
import { getBase64 } from "../../../../utils.js";
import { UserService } from '../../../../services';
import { useMutationHooks } from "../../../../hooks/UseMutationHook.js";
import LoadingComponent from '../../../../components/LoadComponent/Loading.jsx'
import { useSelector, useDispatch } from "react-redux";
import OrderTable from "../../../../components/AdminPageComponent/OrderTable.jsx";
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { SearchOutlined } from '@ant-design/icons';

import {
    success,
    error,
    warning,
  } from "../../../../components/MessageComponents/Message.jsx";
import {useQuery} from '@tanstack/react-query'
import DrawerComponent from '../../../../components/DrawerComponent/Drawer.jsx'
import ModalComponent from '../../../../components/ModalComponent/Modal.jsx'
import UploadComponent from '../../../../components/UploadComponent/UploadComponent.jsx'
export default function UserAdmin() {
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
          title: 'Email',
          dataIndex: 'email',
          sorter: (a, b) => a.price - b.price,
          ...getColumnSearchProps('email')
        },
        {
          title: 'IsAdmin',
          dataIndex: 'isAdmin',
          render: (text) => {
            const isPaid = text === true;
            return (
              <span
                style={{
                  color: isPaid ? '#3adc48' : 'red',
                  fontWeight: 500
                }}
              >
                {isPaid ? 'Admin' : 'Người dùng'}
              </span>
            );
          },
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address - b.address,
            ...getColumnSearchProps('address')
        },
          
        {
          title: 'Action',
          dataIndex: 'action',
          render: RowMenu 
        }
      ];

    // const options = [
    //     {
    //         label: 'Quyền Admin',
    //         value: true, 
    //       },
    //       {
    //         label: 'Quyền user',
    //         value: false, 
    //       },
    //   ];

    //checkbox modal create use
    const user = useSelector((state) => state.user);
    const pages = useSelector((state) => state.pagination);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [RowSelected,setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [typePage,setTypePage] = useState(0)
    const [valueRadio, setvalueRadio] = useState(false);
    const [valueRadioDetail, setValueRadioDetail] = useState();

    const handleValueRadio = (e) =>{
      setStateUser({
        ...stateUser,
        isAdmin: e.target.value
      })
    }

    const handleValueRadioDetail = (e) =>{
      setStateUserDetail({
        ...stateUserDetail,
        isAdmin: e.target.value
      })
    }
    useEffect(() => {
      if (pages) { // Đảm bảo pages không phải là undefined hoặc null
          setTypePage(pages.page)
      }
  }, [pages?.page]);

  const inittial =() => (
    {
      name: '',
      email: '',
      password: '',
      isAdmin: false,
      phone: '',
      address: '',
      avatar: [],
      confirmPassword: ''
  })
    const [stateUser, setStateUser] = useState(inittial)

    const [stateUserDetail, setStateUserDetail] = useState(inittial)

    const handleOnchanges = (e) => {
        setStateUser({
            ...stateUser,
            [e.target.name] : e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {
        setStateUserDetail({
            ...stateUserDetail,
            [e.target.name] : e.target.value
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
        mutation.mutate(stateUser)
        // if(data?.status === 200) {
        //     setIsModalOpen(false);
        // }
    }
    const onFinishFailed = () => {
        setIsModalOpen(false);
    }
    
      // begin Xử lý api create, getAllUser, getUserDetail, UpdateUserDetail user api
    const mutation = useMutationHooks ((data) => {
        const {...rests} = data;
        const res = UserService.RegistUser(data)
        return res
    })

    const fetchUserAll = async(context) => {
        const access_Token =  user.access_Token.split("=")[1];
        const page = context.queryKey[1]
        const res =await UserService.getALLUser(access_Token,page)
        return res
    }

    const mutationUpdate = useMutationHooks ((data) => {
        const {id,...rests} = data;
        const access_Token =  user.access_Token.split("=")[1];
        const res = UserService.updateUser(RowSelected,data,access_Token)
        return res
    })

    const mutationDelete = useMutationHooks(() => {
        const access_Token =  user.access_Token.split("=")[1];
        const res = UserService.DeleteUser(RowSelected,access_Token )
        return res
    })

    const mutationDeleteMany= useMutationHooks((data) => {
      const {access_Token, ...id} = data
      const res = UserService.DeleteManyUser(id,access_Token)
      return res;
    })

    // end Xử lý api create, getAllUser user api

    // các biên show dữ liệu ra client
    const queryUser = useQuery({queryKey: ['AllUser',typePage], queryFn: fetchUserAll, retryDelay: 1000, staleTime: 1000});
    const {data,isLoading} = mutation;
    const {data:Users, isLoading: isLoadingUserAll} = queryUser
    const dataAllUser = Users?.data.allUser
    const {data:UsersUpdateDetail,isLoading: isLoadingUpdateUserDetail} = mutationUpdate
    const {data:DeleteUser, isLoading: isLoadingDeleteUser} = mutationDelete
    const {data:dataDeleteMany, isLoading: dataDeleteisLoadingMany} =mutationDeleteMany
    // show status khi submit dữ liệu tới server
    useEffect(() => {
        if(data?.status === 200) {
            success()
            setStateUser(inittial)
            setIsModalOpen(false);
        }else if(data?.status === 'ERR') {
            error()
        }
    },[data?.status])

    useEffect(() => {
      form.setFieldsValue(stateUser)
    },[form, stateUser])

    useEffect(() => {
        if(UsersUpdateDetail?.status === 200) {
            success()
            setIsOpenDrawer(false)
        }else if(UsersUpdateDetail?.status === 'ERR') {
            error()
        }
    }, [UsersUpdateDetail?.data])
    useEffect(() => {
      if (!isModalOpen) {
        form.setFieldsValue(setStateUserDetail);
      } else {
        form.setFieldsValue(inittial());
      }
    }, [form, setStateUserDetail, isModalOpen]);

    useEffect(() => {
      if(dataDeleteMany?.status === 200) {
        success();
      }else if(dataDeleteMany?.status ==='ERR') {
        error();
      }
    },[dataDeleteMany?.status])

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
        form.setFieldsValue(stateUser)
      },[form, stateUser])

    const handleDetailUser = () => {
        if(RowSelected) {
            setIsLoadingUpdate(true)
            fetchGetDetailsUser()
            setIsOpenDrawer(true)
        }
    }

    const fetchGetDetailsUser = async () => {
        const access_Token =  user.access_Token.split("=")[1];
        const res =await UserService.getDetailUser(RowSelected,access_Token)
        // console.log('res', res)
        if(res?.data) {
            setStateUserDetail({
                name:res?.data?.name,
                email:res?.data?.email,
                isAdmin:res?.data?.isAdmin,
                phone:res?.data?.phone,
                address:res?.data?.address,
                avatar:res?.data?.avatar,
            })
            setValueRadioDetail(res?.data?.isAdmin)
        }
        setIsLoadingUpdate(false)
    }

    //sao khi bấm vào cập nhập thì input có thể hiện thị thông tin
    useEffect(() => {
        form.setFieldsValue(stateUserDetail);
    }, [form, stateUserDetail]);

    // submit update lại user
    const onButtonUpdateUserDetail = () => {
        mutationUpdate.mutate(stateUserDetail,{
            onSettled: () => {
              queryUser.refetch()
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
              queryUser.refetch()
            }
          })
    }

    const handleCancelDelete = () =>  {
        setIsModalOpenDelete(false)
    }
    //end modal delete user


    //Truyền dữ liệu many id 

    const handleDeleteMany = (ids) => {
      // console.log('_id', {_id})
      const access_Token =  user?.access_Token.split("=")[1];
      mutationDeleteMany.mutate({id: ids, access_Token: access_Token},{
        onSettled: () => {
          queryUser.refetch()
        }
      })
    }


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
          Người dùng
        </Typography>
        <Button
          color="primary"
          startDecorator={<AddCircleIcon />}
          size="sm"
          onClick={showModal}
        >
          Tạo user mới
        </Button>

        {/* model addproduct */}
        <Modal
          title="Thêm user mới"
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
              label="Tên người dùng"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền tên người dùng",
                },
              ]}
            >
              <Input
                value={stateUser.name}
                onChange={handleOnchanges}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "vui lòng nhập email",
                },
              ]}
            >
              <Input
                value={stateUser.email}
                onChange={handleOnchanges}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "vui lòng nhập Mật khẩu",
                },
              ]}
            >
              <Input.Password
                value={stateUser.password}
                visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
                }}
                onChange={handleOnchanges}
                name="password"
              />
            </Form.Item>

            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "vui lòng nhập Mật khẩu",
                },
              ]}
            >
              <Input.Password
                value={stateUser.confirmPassword}
                visibilityToggle={{
                visible: passwordVisible1,
                onVisibleChange: setPasswordVisible1,
                }}
                onChange={handleOnchanges}
                name="confirmPassword"
              />
            </Form.Item>

            <Form.Item
              label="isAdmin"
              name="isAdmin"
              rules={[
                {
                  required: true,
                  message: "Tích vào ô checkbox ",
                },
              ]}
            >
            <Radio.Group onChange={handleValueRadio} defaultValue={valueRadio}>
            <Radio value={true}>Admin</Radio>
            <Radio value={false}>Người dùng</Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui Lòng nhập số điện thoại",
                },
              ]}
            >
              <Input
                value={stateUser.phone}
                onChange={handleOnchanges}
                name="phone"
              />
            </Form.Item>
            <Form.Item
              label="Nhập Địa chỉ nhà"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui Lòng nhập Địa chỉ",
                },
              ]}
            >
              <Input
                value={stateUser.address}
                onChange={handleOnchanges}
                name="address"
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
              <UploadComponent setInforPageDetail={setStateUser} InforPageDetail={stateUser} valueImge={stateUser?.avatar} amount={1} valueName="avatar" />
            </Form.Item>
          </Form>
          </LoadingComponent>
        </Modal>

        <DrawerComponent width={720} title="Chỉnh sửa thông tin người dùng" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} 
        extra={
          <Space>
            <Button onClick={() => setIsOpenDrawer(false)}>Cancel</Button>
            <Button onClick={onButtonUpdateUserDetail} type="primary">
              Cập Nhập
            </Button>
          </Space>
        }
         >
         <LoadingComponent isLoading = {isLoadingUpdate ||isLoadingUpdateUserDetail }>
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
              label="Tên người dùng"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền tên người dùng",
                },
              ]}
            >
              <Input
                value={stateUserDetail.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "vui lòng nhập email",
                },
              ]}
            >
              <Input
                value={stateUserDetail.email}
                onChange={handleOnchangeDetails}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="isAdmin"
              name="isAdmin"
              rules={[
                {
                  required: true,
                  message: "Tích vào ô checkbox ",
                },
              ]}
            >
            <Radio.Group onChange={handleValueRadioDetail} value={valueRadioDetail}>
            <Radio value={true}>Admin</Radio>
            <Radio value={false}>Người dùng</Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui Lòng nhập số điện thoại",
                },
              ]}
            >
              <Input
                value={stateUserDetail.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>
            <Form.Item
              label="Nhập Địa chỉ nhà"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui Lòng nhập Địa chỉ",
                },
              ]}
            >
              <Input
                value={stateUserDetail.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
            <Form.Item>
              {UsersUpdateDetail?.status ==='ERR' && (
                <div
                  style={{ color: "red", fontSize: "14px", paddingTop: "10px" }}
                >
                  {UsersUpdateDetail?.message}
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
              <UploadComponent setInforPageDetail={setStateUserDetail} InforPageDetail={stateUserDetail} valueImge={stateUserDetail?.avatar} amount={1} valueName="avatar" />
            </Form.Item>
          </Form>
          </LoadingComponent>
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
      products={dataAllUser}
      dataDeleteMany={dataDeleteMany} 
      dataDeleteisLoadingMany={dataDeleteisLoadingMany}  
      total={Users?.total}
      pageCurrent={Users?.pageCurrent}
      totalPages={Users?.totalPage}
      columns= {columns} handleDeleteMany= {handleDeleteMany}
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
