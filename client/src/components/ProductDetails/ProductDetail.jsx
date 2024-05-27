import {
  Col,
  Row,
  Image,
  Space,
  InputNumber,
  Button,
  Rate,
  Radio,
  Avatar,
  Breadcrumb,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import {
  StarFilled,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { WapperStyleButtonAddProduct } from "./style";
import { ProductService, ReviewService } from "../../services/index";
import { useQuery } from "@tanstack/react-query";
import IsLoadingComponent from "../LoadComponent/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AddOrderProduct } from "../../redux/Slides/orderProductSlide";
import ModalComponentLogin from "../ModalComponent/ModalLogin";
import { convertPrice } from "../../utils";
import {
  success,
  error,
  warning,
} from "../../components/MessageComponents/Message";
import LikeButtonFbComponent from "../LikeButtonFbComponent/LikeButtonFb";
import CommentFbComponent from "../CommentFbComponent/CommentFb";
import { useMutationHooks } from "../../hooks/UseMutationHook";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import { Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
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

export default function ProductDetail({ idProduct }) {
  const [numberProduct, setNumberProduct] = useState(1);
  const [value, setValue] = useState(3);
  const desc = ["Tệ", "Không hài lòng", "Bình thường", "Hài lòng", "Tuyệt vời"];
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueRadio, setValueRadio] = useState();
  const [valColor, setValColor] = useState();
  const [valueColor, setValueColor] = useState();
  const [valueTab, setValueTab] = useState("1");

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
  const onChange = (value) => {
    setNumberProduct(value);
  };
  const onChangeRadio = (e) => {
    setValueRadio(e.target.value);
  };

  const onChangeColor = (e) => {
    setValColor(e.target.value);
  };
  const settings1 = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const settings2 = {
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey[1];

    if (id) {
      const res = await ProductService.getDetailProduct(id);
      return res.data;
    }
  };
  const GetDetailsColor = useMutationHooks(async (id) => {
    if (id) {
      const res = await ProductService.getDetailColor(id);
      return res.data;
    }
  });

  const fetchGetDetailsReview = async (context) => {
    const id = context?.queryKey[1];

    if (id) {
      const res = await ReviewService.getDetailReviewProduct(id);
      return res.data;
    }
  };

  const { data: productDetail, isLoading: IsLoadingProductDetail } = useQuery({
    queryKey: ["products-detail", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });


  const { data: productReview, isLoading: IsLoadingProductDetailReview } =
    useQuery({
      queryKey: ["products-review", idProduct],
      queryFn: fetchGetDetailsReview,
      enabled: !!idProduct,
    });

  const fiveStarReviewsCount = productReview?.filter(
    (review) => review.rating === 5,
  ).length;
  const fourStarReviewsCount = productReview?.filter(
    (review) => review.rating === 4,
  ).length;
  const threeStarReviewsCount = productReview?.filter(
    (review) => review.rating === 3,
  ).length;
  const twoStarReviewsCount = productReview?.filter(
    (review) => review.rating === 2,
  ).length;
  const oneStarReviewsCount = productReview?.filter(
    (review) => review.rating === 1,
  ).length;

  const ratings = [
    { star: 5, count: fiveStarReviewsCount },
    { star: 4, count: fourStarReviewsCount },
    { star: 3, count: threeStarReviewsCount },
    { star: 2, count: twoStarReviewsCount },
    { star: 1, count: oneStarReviewsCount }
  ];
  const calculateAverageRating = (ratings) => {
    let totalStars = 0;
    let totalCount = 0;
  
    ratings.forEach(rating => {
      totalStars += rating.star * rating.count;
      totalCount += rating.count;
    });
  
    return totalStars / totalCount;
  };
  
  const averageRating = calculateAverageRating(ratings);

  useEffect(() => {
    const fetchColorDetails = async () => {
      const colorDetailsPromises = productDetail?.idColor.map((colorId) =>
        GetDetailsColor.mutateAsync(colorId),
      );
      const colorDetails = await Promise.all(colorDetailsPromises);
      setValueColor(colorDetails);
    };
    fetchColorDetails();
  }, [productDetail?.idColor?.length]);

  const [valuePrice, setValuePrice] = useState();

  useEffect(() => {
    if (valueRadio === undefined) {
      setValuePrice(productDetail?.categorySize[0].price);
    } else if (
      valueRadio &&
      productDetail?.categorySize.find(
        (sizeData) => sizeData.size === valueRadio,
      )
    ) {
      setValuePrice(
        productDetail?.categorySize.find(
          (sizeData) => sizeData.size === valueRadio,
        ).price,
      );
    }
  }, [valueRadio, valuePrice]);

  //Modal Login and buy card
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hangleAddCartProduct = () => {
    if (valueRadio) {
      dispatch(
        AddOrderProduct({
          orderItem: {
            name: productDetail?.name,
            amount: numberProduct,
            image: productDetail?.image,
            price: valuePrice,
            category: valueRadio,
            color: valColor,
            product: productDetail?.categorySize.find(
              (sizeData) => sizeData.size === valueRadio,
            )._id,
            productId: productDetail?._id,
          },
        }),
      );
    } else {
      dispatch(
        AddOrderProduct({
          orderItem: {
            name: productDetail?.name,
            amount: numberProduct,
            image: productDetail?.image,
            price: valuePrice,
            category: valueRadio,
            color: valColor,
            product: productDetail?._id,
            productId: productDetail?._id,
          },
        }),
      );
    }
    success("Đã thêm sản phẩm vào giỏ hàng");
  };

  const hangleBuyProduct = () => {
    if (!user?.id) {
      showModal();
      error("Vui lòng đăng nhập");
    } else {
      if (valueRadio) {
        dispatch(
          AddOrderProduct({
            orderItem: {
              name: productDetail?.name,
              amount: numberProduct,
              image: productDetail?.image,
              price: valuePrice,
              category: valueRadio,
              color: valColor,
              product: productDetail?.categorySize.find(
                (sizeData) => sizeData.size === valueRadio,
              )._id,
              productId: productDetail?._id,
            },
          }),
        );
        navigate("/gio-hang", {
          state: {
            listChecked: productDetail?.categorySize.find(
              (sizeData) => sizeData.size === valueRadio,
            )._id,
          },
        });
      } else {
        dispatch(
          AddOrderProduct({
            orderItem: {
              name: productDetail?.name,
              amount: numberProduct,
              image: productDetail?.image,
              price: valuePrice,
              category: valueRadio,
              product: productDetail?._id,
              productId: productDetail?._id,
            },
          }),
        );
        navigate("/gio-hang", { state: { listChecked: productDetail?._id } });
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Get the day, month, and year
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    // Get the hours and minutes
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    let seconds = date.getSeconds().toString().padStart(2, "0");
    seconds = seconds.substring(0, 2);
    return `${day}-${month}-${year} lúc ${hours}:${minutes}:${seconds}`;
  };

  return (
    <IsLoadingComponent isLoading={IsLoadingProductDetail}>
      <Row className="rounded-lg  bg-white">
        <Col className="p-[15px] md:p-[30px]" span={9}>
          <Slider
            {...settings1}
            asNavFor={nav2}
            ref={(slider) => (sliderRef1 = slider)}
          >
            {productDetail?.image.map((img) => (
              <>
                <img
                  className="h-[200px] w-full rounded-lg md:h-[485px]"
                  src={img}
                  alt="image-product"
                />
              </>
            ))}
          </Slider>
          <Slider
            {...settings2}
            asNavFor={nav1}
            ref={(slider) => (sliderRef2 = slider)}
            slidesToShow={5}
            swipeToSlide={true}
            focusOnSelect={true}
            style={{ margin: "10px" }}
          >
            {productDetail?.image.map((img) => (
              <>
                <img src={img} alt="image-product" />
              </>
            ))}
          </Slider>
        </Col>
        <Col
          span={15}
          className="mt-[15px] pr-[15px] md:mt-[30px] md:pr-[30px] "
        >
          <div className="flex flex-col rounded-lg bg-[#ece9e9] p-[10px] md:gap-[4px] md:p-[16px]">
            <div className="mb-[5px] break-words text-[12px] font-[600] leading-[12px] md:text-[24px] md:leading-[32px]">
              {productDetail?.name}
            </div>

            <div>
              <Rate
                value={averageRating?.toFixed(1)}
                className="text-yellow mt-[4px] text-[11px] md:text-[15px]"
                disabled
              />
              <span className="md:text[15px] pl-[1px] text-[12px] ml-2">
                (Xem {productReview?.length} đánh giá) | {productDetail?.selled} đã bán
              </span>
            </div>

            <div className="rounded-[4px] bg-[#ece9e9]">
              <div className="text-[15px] font-[500] leading-[20px] text-[#f00] md:mb-[10px] md:p-[10px] md:text-[32px] md:leading-[40px]">
                {!valueRadio && productDetail?.categorySize.length === 1
                  ? convertPrice(productDetail?.categorySize[0].price)
                  : !valueRadio && productDetail?.categorySize.length > 1
                    ? `${convertPrice(productDetail?.categorySize[0].price)} - ${convertPrice(productDetail?.categorySize[productDetail?.categorySize.length - 1].price)}`
                    : valueRadio &&
                        productDetail?.categorySize.find(
                          (sizeData) => sizeData.size === valueRadio,
                        )
                      ? convertPrice(
                          productDetail?.categorySize.find(
                            (sizeData) => sizeData.size === valueRadio,
                          ).price,
                        )
                      : ""}
              </div>
            </div>
          </div>

          <div className="mt-[6px] flex flex-col rounded-lg bg-[#ece9e9] p-[10px] md:mt-[10px] md:gap-[4px] md:p-[16px]">
            <div>
              <div className="text-[12px] font-[600] leading-[120%] md:text-[16px] md:leading-[150%]">
                Thông tin vận chuyển
              </div>
              <div className="md:text[12px] flex justify-between text-[11px]">
                <div>
                  <span>Giao đến: </span>
                  <span className="md:text[15px] overflow-hidden text-ellipsis text-[11px] font-[500] leading-[12px] underline md:leading-[24px]">
                    427 Kinh Dương Vương, Quận Liên Chiểu, Tp Đà Nẵng
                  </span>
                </div>
                <div>
                  <span style={{ color: "rgb(10, 104, 255)" }}>Đổi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[6px] flex rounded-lg bg-[#ece9e9] p-[10px] md:mt-[10px] md:flex-col md:gap-[4px] md:p-[16px]">
            <div className="mr-[20px]">
              <div className="md:text[14px] m-[0] text-[12px] font-[600] leading-[120%] md:leading-[150%]">
                Số Lượng
              </div>
              <div>
                <Space wrap>
                  <InputNumber
                    className="flex h-[30px] items-center leading-[12px] md:h-[40px]"
                    min={1}
                    max={100000}
                    defaultValue={1}
                    onChange={onChange}
                    value={numberProduct}
                  />
                </Space>
              </div>
            </div>
            <div>
              {productDetail?.categorySize.length > 1 ? (
                <>
                  <div
                    style={{
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "150%",
                      margin: "0",
                    }}
                  >
                    size
                  </div>
                  <div>
                    <Radio.Group onChange={onChangeRadio} value={valueRadio}>
                      {productDetail?.categorySize.map((sizeData) => (
                        <Radio value={sizeData.size}>{sizeData.size}</Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          {valueColor?.length >= 1 ? (
            <div className="mt-[6px] flex rounded-lg bg-[#ece9e9] p-[10px] md:mt-[10px] md:flex-col md:gap-[4px] md:p-[16px]">
              <div
                style={{
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "150%",
                  margin: "0",
                }}
              >
                Màu sắc
              </div>
              <div>
                <Radio.Group onChange={onChangeColor} value={valColor}>
                  {valueColor?.map((colorData) => {
                    return (
                      <Radio value={colorData[0].color_name}>
                        <div className="flex">
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              backgroundColor: colorData[0].hex,
                              marginRight: "5px",
                            }}
                          ></div>
                          <div>{colorData[0].color_name}</div>
                        </div>
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </div>
            </div>
          ) : (
            ""
          )}

          <WapperStyleButtonAddProduct className="flex w-full justify-start">
            <div className="mr-[10px] w-full ">
              <Button
                className="mt-[10px] h-[40px] w-full text-[10px] text-[#fff] md:h-[60px] md:text-[14px]"
                style={{
                  backgroundColor:
                    !valueRadio && productDetail?.categorySize.length === 1
                      ? "rgb(255, 66, 78)"
                      : productDetail?.categorySize.length > 1 && !valueRadio
                        ? "#ccc"
                        : "rgb(255, 66, 78)",
                }}
                disabled={
                  !valueRadio && productDetail?.categorySize.length === 1
                    ? false
                    : productDetail?.categorySize.length > 1 && !valueRadio
                      ? true
                      : false
                }
                icon={<ShoppingCartOutlined />}
                onClick={hangleBuyProduct}
              >
                Mua ngay
              </Button>
              <ModalComponentLogin
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
              />
            </div>

            <div className="mb-[10px] w-full">
              <Button
                icon={<ShoppingCartOutlined />}
                className="buttonAddProduct mt-[10px] h-[40px] w-full text-[10px] md:h-[60px] md:text-[14px]"
                onClick={hangleAddCartProduct}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </WapperStyleButtonAddProduct>
        </Col>
      </Row>d
      <div className=" mb-[20px] mt-[20px] rounded-lg bg-[#ece9e9] p-[15px] md:p-[30px]">
        <div className="mb-[10px]">
          <h1 className="mb-3  mt-[10px] w-full rounded-sm bg-[#d5d5d5] p-3 text-[20px]">
            Chi tiết sản phẩm
          </h1>
          <div className="mb-2 ml-4 flex">
            <div className="w-[200px]">Danh mục</div>
            <div className="flex-1">
              <Breadcrumb>
                <Breadcrumb.Item>Bi Vũ</Breadcrumb.Item>
                <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
                <Breadcrumb.Item>{productDetail?.type}</Breadcrumb.Item>
                <Breadcrumb.Item>{productDetail?.name}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>

          <div className="mb-2 ml-4 flex">
            <div className="w-[200px]">Xuất xứ</div>
            <div className="flex-1">Việt Nam</div>
          </div>

          <div className="mb-2 ml-4 flex">
            <div className="w-[200px]">Chất liệu</div>
            <div className="flex-1">Thủy tinh</div>
          </div>

          <div className="mb-2 ml-4 flex">
            <div className="w-[200px]">Chất liệu</div>
            <div className="flex-1">Thủy tinh</div>
          </div>
        </div>
        <div>
          <h1 className="mb-3  mt-[10px] w-full rounded-sm bg-[#d5d5d5] p-3 text-[20px]">
            Mô tả sản phẩm
          </h1>
          <div className="p-3">
            <div
              dangerouslySetInnerHTML={{ __html: productDetail?.description }}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="w-full rounded-lg bg-[#ece9e9] p-5">
          <TabContext value={valueTab}>
            <h1 className="mb-3  mt-[10px] w-full rounded-sm bg-[#d5d5d5] p-3 text-[20px]">
              Đánh giá sản phẩm
            </h1>
            <div
              className="flex bg-[#dfcccc] p-5"
              style={{ border: "1px solid red" }}
            >
              <div className="w-[120px] md:w-[200px] ">
                <div className="text-[1rem] text-[#ee4d2d] md:text-[1.125rem] ">
                  <span className="text-[1.125rem] text-[#ee4d2d] md:text-[1.875rem] ">
                    {averageRating?.toFixed(1)}
                  </span>{" "}
                  trên 5 với
                </div>
              </div>
              <div className="flex w-full flex-1" style={{ padding: "0 20px" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="Tất cả" value="1" />
                  <Tab
                    label={<span>5 sao ({fiveStarReviewsCount})</span>}
                    value="2"
                  />
                  <Tab
                    label={<span>4 sao ({fourStarReviewsCount})</span>}
                    value="3"
                  />
                  <Tab
                    label={<span>3 sao ({threeStarReviewsCount})</span>}
                    value="4"
                  />
                  <Tab
                    label={<span>2 sao ({twoStarReviewsCount})</span>}
                    value="5"
                  />
                  <Tab
                    label={<span>1 sao ({oneStarReviewsCount})</span>}
                    value="6"
                  />
                </TabList>
              </div>
            </div>
            <div style={{ padding: "5px 10px" }}>
              <TabPanel value="1" sx={{ p: "15px 0" }}>
                <IsLoadingComponent isLoading={IsLoadingProductDetailReview}>
                  {productReview?.map((item) => (
                    <div className="mt-3">
                      <div className="flex " style={{ alignItems: "start" }}>
                        <Space Spacewrap size={10} className="mt-2">
                          <Avatar size="large" src={item.avatar[0]} />
                        </Space>
                        <div className="ml-3">
                          <p>{item.userName}</p>
                          <div className="">
                            <Rate
                              tooltips={desc}
                              disabled
                              value={item.rating}
                            />
                          </div>
                          <div
                            className="flex text-center"
                            style={{ alignItems: "center" }}
                          >
                            <div>Thời gian: {formatDate(item.date)}</div>
                            {item?.size?.length > 0 ? (
                              <>
                                <div
                                  className=" h-5 w-[2px] bg-[#c12c2c]"
                                  style={{ margin: "0 5px" }}
                                ></div>
                                <div>Phân loại hàng: {item.size}</div>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          <div>
                            Màu sắc: <span>đen</span>
                          </div>
                          <div>Bình luận: {item.comments}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </IsLoadingComponent>
              </TabPanel>
              <TabPanel value="2" sx={{ p: "15px 0" }}>
                <IsLoadingComponent isLoading={IsLoadingProductDetailReview}>
                  {productReview
                    ?.filter((item) => item.rating === 5) // Filter reviews with 5-star rating
                    .map((item) => (
                      <div className="mt-3" key={item.id}>
                        <div className="flex" style={{ alignItems: "start" }}>
                          <Space Spacewrap size={10} className="mt-2">
                            <Avatar size="large" src={item.avatar[0]} />
                          </Space>
                          <div className="ml-3">
                            <p>{item.userName}</p>
                            <div className="">
                              <Rate
                                tooltips={desc}
                                disabled
                                value={item.rating}
                              />
                            </div>
                            <div
                              className="flex text-center"
                              style={{ alignItems: "center" }}
                            >
                              <div>Thời gian: {formatDate(item.date)}</div>
                              {item?.size?.length > 0 && (
                                <>
                                  <div
                                    className="h-5 w-[2px] bg-[#c12c2c]"
                                    style={{ margin: "0 5px" }}
                                  ></div>
                                  <div>Phân loại hàng: {item.size}</div>
                                </>
                              )}
                            </div>
                            <div>
                              Màu sắc: <span>đen</span>
                            </div>
                            <div>Bình luận: {item.comments}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </IsLoadingComponent>
              </TabPanel>
              <TabPanel value="3" sx={{ p: "15px 0" }}>
                <IsLoadingComponent isLoading={IsLoadingProductDetailReview}>
                  {productReview
                    ?.filter((item) => item.rating === 4) // Filter reviews with 5-star rating
                    .map((item) => (
                      <div className="mt-3" key={item.id}>
                        <div className="flex" style={{ alignItems: "start" }}>
                          <Space Spacewrap size={10} className="mt-2">
                            <Avatar size="large" src={item.avatar[0]} />
                          </Space>
                          <div className="ml-3">
                            <p>{item.userName}</p>
                            <div className="">
                              <Rate
                                tooltips={desc}
                                disabled
                                value={item.rating}
                              />
                            </div>
                            <div
                              className="flex text-center"
                              style={{ alignItems: "center" }}
                            >
                              <div>Thời gian: {formatDate(item.date)}</div>
                              {item?.size?.length > 0 && (
                                <>
                                  <div
                                    className="h-5 w-[2px] bg-[#c12c2c]"
                                    style={{ margin: "0 5px" }}
                                  ></div>
                                  <div>Phân loại hàng: {item.size}</div>
                                </>
                              )}
                            </div>
                            <div>
                              Màu sắc: <span>đen</span>
                            </div>
                            <div>Bình luận: {item.comments}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </IsLoadingComponent>
              </TabPanel>

              <TabPanel value="4" sx={{ p: "15px 0" }}>
                <IsLoadingComponent isLoading={IsLoadingProductDetailReview}>
                  {productReview
                    ?.filter((item) => item.rating === 3) // Filter reviews with 5-star rating
                    .map((item) => (
                      <div className="mt-3" key={item.id}>
                        <div className="flex" style={{ alignItems: "start" }}>
                          <Space Spacewrap size={10} className="mt-2">
                            <Avatar size="large" src={item.avatar[0]} />
                          </Space>
                          <div className="ml-3">
                            <p>{item.userName}</p>
                            <div className="">
                              <Rate
                                tooltips={desc}
                                disabled
                                value={item.rating}
                              />
                            </div>
                            <div
                              className="flex text-center"
                              style={{ alignItems: "center" }}
                            >
                              <div>Thời gian: {formatDate(item.date)}</div>
                              {item?.size?.length > 0 && (
                                <>
                                  <div
                                    className="h-5 w-[2px] bg-[#c12c2c]"
                                    style={{ margin: "0 5px" }}
                                  ></div>
                                  <div>Phân loại hàng: {item.size}</div>
                                </>
                              )}
                            </div>
                            <div>
                              Màu sắc: <span>đen</span>
                            </div>
                            <div>Bình luận: {item.comments}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </IsLoadingComponent>
              </TabPanel>

              <TabPanel value="5" sx={{ p: "15px 0" }}>
                <IsLoadingComponent isLoading={IsLoadingProductDetailReview}>
                  {productReview
                    ?.filter((item) => item.rating === 2) // Filter reviews with 5-star rating
                    .map((item) => (
                      <div className="mt-3" key={item.id}>
                        <div className="flex" style={{ alignItems: "start" }}>
                          <Space Spacewrap size={10} className="mt-2">
                            <Avatar size="large" src={item.avatar[0]} />
                          </Space>
                          <div className="ml-3">
                            <p>{item.userName}</p>
                            <div className="">
                              <Rate
                                tooltips={desc}
                                disabled
                                value={item.rating}
                              />
                            </div>
                            <div
                              className="flex text-center"
                              style={{ alignItems: "center" }}
                            >
                              <div>Thời gian: {formatDate(item.date)}</div>
                              {item?.size?.length > 0 && (
                                <>
                                  <div
                                    className="h-5 w-[2px] bg-[#c12c2c]"
                                    style={{ margin: "0 5px" }}
                                  ></div>
                                  <div>Phân loại hàng: {item.size}</div>
                                </>
                              )}
                            </div>
                            <div>
                              Màu sắc: <span>đen</span>
                            </div>
                            <div>Bình luận: {item.comments}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </IsLoadingComponent>
              </TabPanel>

              <TabPanel value="6" sx={{ p: "15px 0" }}>
                <IsLoadingComponent isLoading={IsLoadingProductDetailReview}>
                  {productReview
                    ?.filter((item) => item.rating === 1) // Filter reviews with 5-star rating
                    .map((item) => (
                      <div className="mt-3" key={item.id}>
                        <div className="flex" style={{ alignItems: "start" }}>
                          <Space Spacewrap size={10} className="mt-2">
                            <Avatar size="large" src={item.avatar[0]} />
                          </Space>
                          <div className="ml-3">
                            <p>{item.userName}</p>
                            <div className="">
                              <Rate
                                tooltips={desc}
                                disabled
                                value={item.rating}
                              />
                            </div>
                            <div
                              className="flex text-center"
                              style={{ alignItems: "center" }}
                            >
                              <div>Thời gian: {formatDate(item.date)}</div>
                              {item?.size?.length > 0 && (
                                <>
                                  <div
                                    className="h-5 w-[2px] bg-[#c12c2c]"
                                    style={{ margin: "0 5px" }}
                                  ></div>
                                  <div>Phân loại hàng: {item.size}</div>
                                </>
                              )}
                            </div>
                            <div>
                              Màu sắc: <span>đen</span>
                            </div>
                            <div>Bình luận: {item.comments}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </IsLoadingComponent>
              </TabPanel>
            </div>
          </TabContext>
        </div>
      </div>
    </IsLoadingComponent>
  );
}
