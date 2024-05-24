import {
  Avatar,
  Col,
  Image,
  Badge,
  Dropdown,
  List as AntdList,
  InputNumber,
  Row,
} from "antd";
import React, { useEffect, useState, useRef } from "react";
import {
  WrapperHeaderMid,
  WrapperHeaderAccount,
  WrapperHeaderCart,
} from "../../pages/HomePage/style";
import {
  ShoppingCartOutlined,
  CloseCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Logo1 from "../../assets/font-end/imgs/logo/logo1.png";
import Logo2 from "../../assets/font-end/imgs/logo/logo2.png";
import ButtonInputSearch from "../ButtonSearch/ButtonInputSearch";
import TypeProduct from "../TypeProduct/TypeProduct";
import { useSelector, useDispatch } from "react-redux";
import { UserService } from "../../services/index";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/Slides/userSlide";
import {
  SearchProduct,
  SearchisInputEmpty,
} from "../../redux/Slides/productSlide";
import {IncreaseAmount,DecreaseAmount} from "../../redux/Slides/orderProductSlide";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Drawer,
  Button,
  Divider,
  List,
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
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from "@mui/icons-material/Logout";
import IsLoadingComponent from "../LoadComponent/Loading";
import { useDebounce } from "../../hooks/UseMutationHook";
import { ProductService } from "../../services/index";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import { convertPrice } from "../../utils";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/config";
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

export default function headerHome({isHeaderVisible}) {
  const settings = {
    infinite: false,
    slidesToShow: 10,
    slidesToScroll: 10,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
    ],
  };
  //các biến
  const refSearch = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [open, setOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [value, setValue] = useState("1");
  const [searchInput, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(1);
  const searchDebouned = useDebounce(searchInput, 500);
  const [limit, setLimit] = useState(6);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const threshold = 65; // Điều kiện để header trở nên dính cố định
      setSticky(offset > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);
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
    const limit = context.queryKey[1];
    const search = context.queryKey[2];
    const res = await ProductService.getAllProduct(limit, search);
    return res;
  };

  const fetchTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };

  useEffect(() => {
    if (refSearch.current) {
      fetchProductAll(searchDebouned);
    }
    refSearch.current = true;
  }, [searchDebouned]);

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", limit, searchDebouned],
    queryFn: fetchProductAll,
  });
  const { data: productType, isLoading: isLoadingProductType } = useQuery({
    queryKey: ["productsType"],
    queryFn: fetchTypeProduct,
  });
  //Xử lý phần Loading Logout
  const handLogout = async () => {
    await signOut(auth)
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
  };

  const handleItemClickOrderDetail = () => {
    navigate(`/don-hang/${user.id}`, {
      state: {
        id: user.id,
       token:user.access_Token,
      }
    })
  } 

  useEffect(() => {
    setUserName(user?.name);
    setUserAvatar(user?.avatar[0]);
  }, [user?.name, user?.avatar]);

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
                style={{
                  cursor: "pointer",
                  fontSize: "30px",
                  marginTop: "10px",
                }}
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
                <>
                  <Avatar
                    src={userAvatar}
                    size={80}
                    style={{ marginTop: "10px" }}
                  />{" "}
                </>
              ) : (
                <>
                  <AccountCircleIcon sx={{ fontSize: 80, mt: "10px" }} />{" "}
                </>
              )}
            </>
          ) : (
            <>
              <AccountCircleIcon sx={{ fontSize: 80, mt: "10px" }} />
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
            <ListItem disablePadding onClick={handleItemClickOrderDetail}>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingBasketIcon />
                </ListItemIcon>
                <ListItemText primary="Đơn hàng của tôi" />
              </ListItemButton>
            </ListItem>
            {user?.isAdmin === true && (
              <>
                <ListItem disablePadding onClick={handleItemClickAdmin}>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chỉnh sửa thông tin trang web" />
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
    setSearch(e.target.value);
  };

  // biến dữ liệu của search
  const dataSearch = products?.data?.map((item, index) => {
    return {
      title: item.name,
    };
  });


  const orderItemsExist = order.orderItems;
  const items = orderItemsExist
    ? [
        {
          type: "group",
          label: (
            <div className="w-[250px] md:w-[400px]">
              <div>Tất cả {order?.orderItems?.length} sản phẩm</div>
              <div
                style={{
                  margin: "10px 0",
                  maxHeight: "300px",
                  overflow: "auto",
                }}
              >
                {order.orderItems?.map((item) => {
                  return (
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      <Image width={50} height={60} src={item?.image} />
                      <div
                        style={{
                          marginLeft: "10px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="flex justify-between w-full">
                          <div>{item?.name}</div>
                          <div>{convertPrice(item?.price)}</div>
                        </div>
                        <div
                          style={{ textAlign: "center", alignItems: "center" }}
                        >
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  bottom: "0",
                }}
              >
                <div></div>
                <Button onClick={()=> navigate("/gio-hang")}>Xem giỏ hàng</Button>
              </div>
            </div>
          ),
        },
      ]
    : [
        {
          type: "group",
          label: null, // Không hiển thị nội dung nếu không có dữ liệu
        },
      ];

  //show dữ liệu drawer bên left

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (event, index, url) => {
    setSelectedIndex(index);
    if (index === -1) {
      navigate(url);
    }
  };
  const showDrawer = () => {
    setOpenSidebar(true);
  };
  const onClose = () => {
    setOpenSidebar(false);
  };
  const drawersleft = (
    <div style={{ width: "250px"}}>
      <div
        className="mt-10  w-full"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img
          src={Logo1}
          className="mb-5 h-[50px] w-[100px] md:ml-5 md:h-[80px] md:w-[150px]"
        />
      </div>

      <div style={{ position: "relative" }}>
        <ButtonInputSearch
          size="large"
          placeholder="Nhập dữ liệu"
          textButton="Tìm kiếm"
          onChange={handleSearchInput}
          onFocus={handleSearchInputFocus}
          onBlur={handleSearchInputBlur}
        />
        {showList ? (
          <IsLoadingComponent isLoading={isLoadingProducts}>
            <AntdList
              ordered
              dataSource={dataSearch}
              className="absolute left-0 top-[100%] z-[100000] mt-1 w-full bg-[#FFFFFF] p-2 shadow-lg"
              renderItem={(item, index) => (
                <AntdList.Item>{item.title}</AntdList.Item>
              )}
            />
          </IsLoadingComponent>
        ) : (
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, -1, "/")}
              >
                <ListItemText primary="Trang Chủ" />
              </ListItemButton>
              {productType?.data?.map((item, index) => {
                return (
                  <ListItemButton
                    key={index}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index, item)}
                  >
                    <TypeProduct style name={item}></TypeProduct>
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        )}
      </div>
    </div>
  );
  return (
    <div style={{
      display: isHeaderVisible === false ? 'none' : ''
    }}>
      <Row
        className="wrapper-header-top  w-full bg-[#dee2e6]"
        style={{
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <Col span={4} className="">
          Xin Chào Bạn Đã Đến Shop
        </Col>
        <Col span={8}>MỌI THÔNG TIN( Bảo Hành)VỀ SẢN PHẨM VUI LÒNG LIÊN HỆ</Col>
        <Col span={8}>
          ZALO SHOP: 0943392799 Fanpage : Cửa Hàng Phật Giáo Bi Vũ
        </Col>
        <Col span={4}>col-6</Col>
      </Row>
      <div
        className="w-[100%] text-center "
        style={{
          textAlign: "center",
          // transform: isSticky ? "translateY(-100%)" : "translateY(0)",
          position: isSticky ? "fixed" : "",
          top: isSticky ? "0" : "",
          zIndex: isSticky ? "1000" : "",
          transition: isSticky ? "top 0.3s" : "",
        }}
      >
        <WrapperHeaderMid
          className="w-full items-center p-pad-sm md:p-pad-md"
          style={{ position: isSticky ? "fixed" : "" }}
        >
          <Col xs={4} md={4}>
            <img
              src={Logo1}
              onClick={() => navigate("/")}
              className="h-[50px] w-[100px] cursor-pointer md:ml-5 md:h-[80px] md:w-[150px]"
            />
          </Col>
          {/* <Col span={9}>
        <img src={Logo2} style={{
            width: '290px',
            height: '80px',
          }}/>
        </Col> */}
          <Col xs={7} md={14} className="text-left md:text-center">
            <div style={{ position: "relative" }} className="hidden md:block ">
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
                  <AntdList
                    ordered
                    dataSource={dataSearch}
                    className="absolute left-0 top-[100%] z-[100000] mt-1 w-full bg-[#FFFFFF] p-2 shadow-lg"
                    renderItem={(item, index) => (
                      <AntdList.Item>{item.title}</AntdList.Item>
                    )}
                  />
                </IsLoadingComponent>
              )}
            </div>
            <div className="block md:hidden  ">
              <Button type="primary" onClick={showDrawer}>
                <MenuOutlined style={{ fontSize: "25px" }} />
              </Button>
              <Drawer
                title="Basic Drawer"
                placement="left"
                onClose={onClose}
                open={openSidebar}
              >
                {drawersleft}
              </Drawer>
            </div>
          </Col>
          <Col xs={13} md={6} style={{ textAlign: "right" }}>
            <div className="ml-[60px] flex md:ml-0">
              <WrapperHeaderAccount style={{ textAlign: "center" }}>
                {user?.access_Token ? (
                  <>
                    <div>
                      <Button
                        onClick={toggleDrawer(true)}
                        style={{ padding: "5px" }}
                      >
                        {userAvatar ? (
                          <>
                            <Avatar
                              src={userAvatar}
                              className="text-[25px] md:text-[40px]"
                            />
                            <span className="hidden md:block md:text-[12px] ">
                              {user?.name}
                            </span>
                          </>
                        ) : (
                          <>
                            <AccountCircleIcon className="ml-5 text-[25px] md:text-[40px]" />
                            <span className="hidden text-[9px] md:block md:text-[12px]">
                              {user?.name}
                            </span>
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
                      style={{ padding: "5px" }}
                      className="ml-0 md:ml-3"
                    >
                      <AccountCircleIcon
                        sx={{ fontSize: { xs: "25px", md: "30px" } }}
                      />
                      <span className="text-[9px] md:text-[12px]">
                        Đăng nhập/Đăng kí
                      </span>
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
              <WrapperHeaderCart
                style={{ textAlign: "center", alignContent: "center" }}
              >
                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  trigger={["click"]}
                  arrow
                >
                  <div
                    style={{ cursor: "pointer", marginRight: "20px" }}
                    className="md:mr-0"
                  >
                    <Badge count={order?.orderItems?.length} showZero>
                      <ShoppingCartOutlined className="text-[40px] md:text-[40px]" />
                    </Badge>
                  </div>
                </Dropdown>
              </WrapperHeaderCart>
            </div>
          </Col>
        </WrapperHeaderMid>
        <div
          className="align-center hidden  bg-[#60609B]  text-white md:block"
          style={{
            height: "auto",
            zIndex: "1000",
            position: isSticky ? "fixed" : "static",
            top: isSticky ? "80px" : "",
            width: isSticky ? "100%" : "",
            padding: "0 160px",
          }}
        >
          <Slider {...settings}>
            {productType?.data?.map((item, index) => {
              return <TypeProduct style name={item} />;
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
