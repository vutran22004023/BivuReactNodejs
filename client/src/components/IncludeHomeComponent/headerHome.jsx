import { Avatar, Col, Image } from "antd";
import React, { useEffect, useState } from "react";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Drawer,
  Button,
  Divider,
  Grid,
  Tab,
  List,
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

export default function headerHome() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
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
          <ButtonInputSearch
            size="large"
            placeholder="Nhập dữ liệu"
            textButton="Tìm kiếm"
          />
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
            <ShoppingCartOutlined style={{ fontSize: "40px" }} />
            <WrapperHeaderSpan>Giỏ hàng</WrapperHeaderSpan>
          </WrapperHeaderCart>
        </Col>
      </WrapperHeaderMid>

      <WrapperHeaderTypeProduct>
        {arr.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
      </WrapperHeaderTypeProduct>
    </div>
  );
}
