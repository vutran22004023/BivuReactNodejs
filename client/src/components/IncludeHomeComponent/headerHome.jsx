import { Avatar, Col, Image,List,Badge } from "antd";
import React, { useEffect, useState,useRef } from "react";
import {
  WrapperHeaderTop,
  WrapperHeaderMid,
  WrapperHeaderAccount,
  WrapperHeaderCart,
  WrapperHeaderSpan,
  WrapperHeaderTypeProduct,
  WrapperHeaderLink,
} from "../../pages/HomePage/style";
import Loading from "../../components/LoadComponent/Loading";
import { WapperContentPopup } from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Logo1 from "../../assets/font-end/imgs/logo/logo1.png";
import Logo2 from "../../assets/font-end/imgs/logo/logo2.png";
import ButtonInputSearch from "../ButtonSearch/ButtonInputSearch";
import TypeProduct from "../TypeProduct/TypeProduct";
import { useSelector, useDispatch } from "react-redux";
import { UserService } from "../../services/index";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/Slides/userSlide";
import {SearchProduct,SearchisInputEmpty} from '../../redux/Slides/productSlide'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Drawer,
  Button,
  Divider,
  Grid,
  Tab,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LoginComponent from "../Login-RegisterComponent/Login";
import RegisterComponent from "../Login-RegisterComponent/Register";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import IsLoadingComponent from '../LoadComponent/Loading'
import {useDebounce} from '../../hooks/UseMutationHook'
import {ProductService}from '../../services/index'
import {useQuery} from '@tanstack/react-query'
import Slider from "react-slick";


export const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

export const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};


export default function headerHome() {
  const settings = {
    infinite: false,
    slidesToShow: 10,
    slidesToScroll: 10,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  //các biến 
  const refSearch = useRef()
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("1");
  const [searchInput,setSearch] = useState('')
  const [showList, setShowList] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const searchDebouned = useDebounce(searchInput, 500)
  const [limit, setLimit] = useState(6)
  // đóng mở List trong search
  const handleSearchInputFocus = () => {
    setShowList(true);
  };
  const handleSearchInputBlur = () => {
    setShowList(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  // api lấy dữ liệu search
  const fetchProductAll = async (context) => {
    const limit = context.queryKey[1]
    const search = context.queryKey[2]
      const res = await ProductService.getAllProduct(limit,search);
      return res;
  };

  const fetchTypeProduct = async () => {
      const res = await ProductService.getAllTypeProduct();
      return res;
  };

    useEffect(() => {
    if (refSearch.current) {
      fetchProductAll(searchDebouned)

    }
    refSearch.current = true;
  }, [searchDebouned]);

  const { data:products,isLoading:isLoadingProducts } = useQuery({queryKey: ['products', limit,searchDebouned], queryFn: fetchProductAll});
  const { data:productType,isLoading:isLoadingProductType } = useQuery({queryKey: ['productsType'], queryFn: fetchTypeProduct});
  //Xử lý phần Loading Logout
  const handLogout = async () => {
    localStorage.removeItem("access_Token");
    document.cookie =
      "access_Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    try {
      setLoading(true);
      UserService.LogOutUser();

      navigate("/");
      dispatch(resetUser());
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleItemClick = () => {
    // Điều hướng đến trang /profile-user khi ListItem được nhấp
    navigate("/profile-user");
    window.location.reload();
  };

  const handleItemClickAdmin = () => {
    navigate("/admin");
  }

  useEffect(() => {
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
  }, [user?.name, user?.avatar]);

  const arr = ["TV", "Tu Lanh", "Dieu hoa"];

  const DrawerList = (
    <Box
      sx={{
        width: { xs: "250px", md: "350px" },
      }}
      role="presentation"
    >
      <Grid
        spacing={2}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          display: "flex",
          mb: "10px",
        }}
      >
        <Grid xs={6}>
          <div>
            <div>
              <CloseCircleOutlined
                style={{ cursor: "pointer", fontSize: "30px", marginTop: '10px'}}
                onClick={toggleDrawer(false)}
              />
            </div>
            <div
              style={{ marginTop: "30px", fontSize: "16px", fontWeight: "600" }}
            >
              {user?.access_Token ? (
                <>Xin chào {user?.name || user?.email}</>
              ) : (
                <>Xin chào quý khách</>
              )}
            </div>
          </div>
        </Grid>
        <Grid xs={6}>
        {user?.access_Token ? (
          <>
          {userAvatar ? (
            <><Avatar src={userAvatar} size={80} style={{marginTop: '10px'}} /> </>
          ) : (
           <><AccountCircleIcon sx={{ fontSize: 80,mt: '10px' }} /> </>
          )}
          </>
        ): (
          <>
          <AccountCircleIcon sx={{ fontSize: 80,mt: '10px' }} />
          </>
        )}  
        </Grid>
      </Grid>
      {user?.access_Token ? (
        <>
          <Divider />
            <List>
              <ListItem disablePadding onClick={handleItemClick}>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Thông tin người dùng" />
                </ListItemButton>
              </ListItem>
              {user?.isAdmin === true && (
                <>
                <ListItem disablePadding onClick={handleItemClickAdmin}>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Chỉnh sửa thông tin trang web"/>
                </ListItemButton>
              </ListItem>
                </>
              )}
              <ListItem disablePadding onClick={handLogout}>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Đăng Xuất" />
                </ListItemButton>
              </ListItem>
            </List>
        </>
      ) : (
        <>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Đăng nhập" value="1" />
                <Tab label="Đăng kí" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ p: 0 }}>
              <LoginComponent />
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0 }}>
              <RegisterComponent />
            </TabPanel>
          </TabContext>
        </>
      )}
    </Box>
  );

// onchange nhập input 
  const handleSearchInput = (e) => {
    setSearch(e.target.value)
  } 

// biến dữ liệu của search
  const dataSearch = products?.data?.map((item, index) => {
    return {
      title: item.name, 
    };
  });
  return (
    <div>
      <WrapperHeaderTop style={{ textAlign: "center" }}>
        <Col span={4}>
          Xin Chào Bạn Đã Đến Shop |CẢM ƠN BẠN LÀ KHÁCH HÀNG Của Shop
        </Col>
        <Col span={8}>MỌI THÔNG TIN( Bảo Hành)VỀ SẢN PHẨM VUI LÒNG LIÊN HỆ</Col>
        <Col span={8}>
          ZALO SHOP: 0943392799 Fanpage : Cửa Hàng Phật Giáo Bi Vũ
        </Col>
        <Col span={4}>col-6</Col>
      </WrapperHeaderTop>

      <WrapperHeaderMid gutter={16} style={{ textAlign: "center" }}>
        <Col span={4}>
          <Image
            src={Logo1}
            style={{
              width: "150px",
              height: "80px",
            }}
            preview={false}
          />
        </Col>
        {/* <Col span={9}>
        <img src={Logo2} style={{
            width: '290px',
            height: '80px',
          }}/>
        </Col> */}
        <Col span={14}>
        <div style={{ position: 'relative' }}>
  <ButtonInputSearch
    size="large"
    placeholder="Nhập dữ liệu"
    textButton="Tìm kiếm"
    onChange={handleSearchInput}
    onFocus={handleSearchInputFocus}
    onBlur={handleSearchInputBlur}
  />
  {showList && (
    <IsLoadingComponent isLoading={isLoadingProducts}>
  <List
    ordered
    dataSource={dataSearch}
    style={{
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    zIndex: 10000,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 1,
    boxShadow: '10px 0px 15px -10px rgba(0,0,0,0.75), -10px 0px 15px -10px rgba(0,0,0,0.75), 0px 10px 15px -10px rgba(0,0,0,0.75)'
  }}
    renderItem={(item,index) => (
      <List.Item>
        {item.title}
      </List.Item>
    )}
  />
  </IsLoadingComponent>
)}
</div>
        </Col>
        <Col
          span={6}
          style={{ textAlign: "left", display: "flex", gap: "10px" }}
        >
          <WrapperHeaderAccount>
            {user?.access_Token ? (
              <>
                <div>
                  <Button
                    onClick={toggleDrawer(true)}
                    style={{ border: "1px solid #7487f24a" }}
                  >
                    {userAvatar ? (
                      <>
                        <Avatar src={userAvatar} size={40} />
                        <span style={{ fontSize: "12px" }}>{user?.name}</span>
                      </>
                    ) : (
                      <>
                        <AccountCircleIcon sx={{ fontSize: 40 }} />
                        <span style={{ fontSize: "12px" }}>{user?.name}</span>
                      </>
                    )}
                  </Button>
                  <Drawer
                    open={open}
                    onClose={toggleDrawer(false)}
                    variant="outlined"
                    anchor="right"
                  >
                    {DrawerList}
                  </Drawer>
                </div>
              </>
            ) : (
              <div>
                <Button
                  onClick={toggleDrawer(true)}
                  style={{ border: "1px solid #7487f24a" }}
                >
                  <AccountCircleIcon sx={{ fontSize: 40 }} />
                  <span style={{ fontSize: "12px" }}>Đăng nhập/Đăng kí</span>
                </Button>
                <Drawer
                  open={open}
                  onClose={toggleDrawer(false)}
                  variant="outlined"
                  anchor="right"
                >
                  {DrawerList}
                </Drawer>
              </div>
            )}
          </WrapperHeaderAccount>
          <WrapperHeaderCart style={{ textAlign: "center" }}>
          <Badge count={order?.orderItems?.length} >
            <ShoppingCartOutlined style={{ fontSize: "40px" }} />
          </Badge>
            <WrapperHeaderSpan>Giỏ hàng</WrapperHeaderSpan>
          </WrapperHeaderCart>
        </Col>
      </WrapperHeaderMid>
      <WrapperHeaderTypeProduct style={{alignItems: 'center',
    gap: '16px',
    justifyContent: 'flex-start',
    padding: '0 160px',
    backgroundColor: '#60609B',
    height: '48px',
    color: '#fff',
    }}>
      <Slider {...settings}>
         {productType?.data?.map((item, index) => {
          return (
              <TypeProduct  name={item} />
          )
        })}
        </Slider>
      </WrapperHeaderTypeProduct>
    </div>
  );
}
