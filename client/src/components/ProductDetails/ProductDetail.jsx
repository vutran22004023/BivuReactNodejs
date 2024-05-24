import { Col, Row, Image, Space, InputNumber, Button, Rate, Radio, Avatar } from "antd";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { StarFilled, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import {
  WapperStyleButtonAddProduct,

} from "./style";
import { ProductService,ReviewService} from "../../services/index";
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
import LikeButtonFbComponent from '../LikeButtonFbComponent/LikeButtonFb'
import CommentFbComponent from '../CommentFbComponent/CommentFb'
import {useMutationHooks} from '../../hooks/UseMutationHook'
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
  const [valueColor,setValueColor] = useState()
  const onChange = (value) => {
    setNumberProduct(value);
  };
  const onChangeRadio = (e) => {
    setValueRadio(e.target.value);
  };

  const onChangeColor = (e) => {
    setValColor(e.target.value)
  }
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

  const { data: productReview, isLoading: IsLoadingProductDetailReview } = useQuery({
    queryKey: ["products-review", idProduct],
    queryFn: fetchGetDetailsReview,
    enabled: !!idProduct,
  });
  useEffect(() => {
    const fetchColorDetails = async () => {
      const colorDetailsPromises = productDetail.idColor.map((colorId) => GetDetailsColor.mutateAsync(colorId));
      const colorDetails = await Promise.all(colorDetailsPromises);
      setValueColor(colorDetails)
    }
    fetchColorDetails();
  },[productDetail?.idColor?.length])

  const [valuePrice, setValuePrice] = useState();

  useEffect(() => {
    if(valueRadio === undefined) {
      setValuePrice(productDetail?.categorySize[0].price)
    }else if(valueRadio && productDetail?.categorySize.find((sizeData) => sizeData.size === valueRadio)) {
      setValuePrice(productDetail?.categorySize.find((sizeData) => sizeData.size === valueRadio).price)
    }

  },[valueRadio,valuePrice])

  //Modal Login and buy card
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hangleAddCartProduct = () => {
    if(valueRadio) {
      dispatch(
        AddOrderProduct({
          orderItem: {
            name: productDetail?.name,
            amount: numberProduct,
            image: productDetail?.image,
            price: valuePrice,
            category: valueRadio,
            color:valColor,
            product: productDetail?.categorySize.find((sizeData) => sizeData.size === valueRadio)._id,
            productId:productDetail?._id
          },
        }),
      )
    }else {
      dispatch(
        AddOrderProduct({
          orderItem: {
            name: productDetail?.name,
            amount: numberProduct,
            image: productDetail?.image,
            price: valuePrice,
            category: valueRadio,
            color:valColor,
            product: productDetail?._id,
            productId:productDetail?._id
          },
        }),
      )
    }
    success("Đã thêm sản phẩm vào giỏ hàng")
  };


  const hangleBuyProduct = () => {
    if (!user?.id) {
      showModal();
      error('Vui lòng đăng nhập')
    } else {
      if(valueRadio) {
        dispatch(
          AddOrderProduct({
            orderItem: {
              name: productDetail?.name,
              amount: numberProduct,
              image: productDetail?.image,
              price: valuePrice,
              category: valueRadio,
              color:valColor,
              product: productDetail?.categorySize.find((sizeData) => sizeData.size === valueRadio)._id,
              productId:productDetail?._id
            },
          }),
        )
        navigate("/gio-hang", { state: { listChecked: productDetail?.categorySize.find((sizeData) => sizeData.size === valueRadio)._id } });
      }else {
        dispatch(
          AddOrderProduct({
            orderItem: {
              name: productDetail?.name,
              amount: numberProduct,
              image: productDetail?.image,
              price: valuePrice,
              category: valueRadio,
              product: productDetail?._id,
              productId:productDetail?._id
            },
          }),
        )
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
    console.log(date);
    // Get the day, month, and year
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    
    // Get the hours and minutes
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    seconds = seconds.substring(0, 2);
    return `${day}-${month}-${year} lúc ${hours}:${minutes}:${seconds}`;
  };

  return (
    <IsLoadingComponent isLoading={IsLoadingProductDetail}>
      <Row className="bg-white  rounded-lg">
        <Col className="p-[15px] md:p-[30px]" span={9}>
          <Slider
            {...settings1}
            asNavFor={nav2}
            ref={(slider) => (sliderRef1 = slider)}
          >
            {productDetail?.image.map((img) => (
              <>
                <img className="h-[200px] md:h-[485px] w-full rounded-lg" src={img} alt="image-product" />
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
        <Col span={15} className="mt-[15px] pr-[15px] md:mt-[30px] md:pr-[30px] ">
          <div className="flex flex-col bg-[#ece9e9] rounded-lg p-[10px] md:gap-[4px] md:p-[16px]">
            <div className="text-[12px] font-[600] leading-[12px] break-words mb-[5px] md:text-[24px] md:leading-[32px]">
              {productDetail?.name}
            </div>

            <div>
              <Rate
                allowHalf
                defaultValue={productDetail?.rating}
                className="text-[11px] text-yellow mt-[4px] md:text-[15px]"
                
              />

              <span className="text-[10px] md:text[15px] pl-[1px]">(Xem 5 đánh giá) | Đã bán 34</span>
            </div>

            <div className="bg-[#ece9e9] rounded-[4px]">
              <div className="text-[15px] leading-[20px] font-[500] md:p-[10px] md:mb-[10px] text-[#f00] md:text-[32px] md:leading-[40px]">
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

          <div className="flex flex-col bg-[#ece9e9] rounded-lg p-[10px] mt-[6px] md:p-[16px] md:gap-[4px] md:mt-[10px]">
            <div>
              <div className="font-[600] text-[12px] leading-[120%] md:text-[16px] md:leading-[150%]">Thông tin vận chuyển</div>
              <div className="flex justify-between text-[11px] md:text[12px]">
                <div>
                  <span>Giao đến: </span>
                  <span className="underline text-[11px] leading-[12px] font-[500] overflow-hidden text-ellipsis md:text[15px] md:leading-[24px]">
                    427 Kinh Dương Vương, Quận Liên Chiểu, Tp Đà Nẵng
                  </span>
                </div>
                <div>
                  <span style={{ color: "rgb(10, 104, 255)" }}>Đổi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:flex-col bg-[#ece9e9] rounded-lg p-[10px] mt-[6px] md:p-[16px] md:gap-[4px] md:mt-[10px]">
            <div className="mr-[20px]">
              <div className="text-[12px] font-[600] leading-[120%] m-[0] md:text[14px] md:leading-[150%]">
                Số Lượng
              </div>
              <div>
                <Space wrap>
                  <InputNumber
                    className="h-[30px] flex items-center leading-[12px] md:h-[40px]"
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
            ) : ""}
            </div>
            
          </div>
            {valueColor?.length >= 1 ? (
              <div className="flex md:flex-col bg-[#ece9e9] rounded-lg p-[10px] mt-[6px] md:p-[16px] md:gap-[4px] md:mt-[10px]">
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
                        <div style={{width:'20px', height:'20px', backgroundColor: colorData[0].hex, marginRight:'5px'}}></div>
                        <div>{colorData[0].color_name}</div>
                        </div>
                      </Radio>
                    )
                  })}
                </Radio.Group>
              </div>
              </div>  
             ) : ""}
          
          
          <WapperStyleButtonAddProduct className="flex justify-start w-full">
            <div className="mr-[10px] w-full ">
              <Button className="h-[40px] text-[10px] md:text-[14px] w-full mt-[10px] md:h-[60px] text-[#fff]"
                style={{
                 backgroundColor: !valueRadio && productDetail?.categorySize.length === 1 ?
                 "rgb(255, 66, 78)" : 
                 (productDetail?.categorySize.length > 1 && !valueRadio ? "#ccc" : "rgb(255, 66, 78)"),
                }}
                disabled= {!valueRadio && productDetail?.categorySize.length === 1 ?
                 false : 
                 (productDetail?.categorySize.length > 1 && !valueRadio ? true : false)
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


            <div className="w-full mb-[10px]">
              <Button
                icon={<ShoppingCartOutlined />}
                className="buttonAddProduct h-[40px] md:h-[60px] w-full mt-[10px] text-[10px] md:text-[14px]"
                onClick={hangleAddCartProduct}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </WapperStyleButtonAddProduct>
        </Col>
        <CommentFbComponent dataHref="https://developers.facebook.com/docs/plugins/comments#configurator"/>
      </Row>

      <div className="motasanpham bg-white p-[15px] rounded-lg md:p-[30px] mt-[20px] mb-[20px]">
        <div className="mb-[10px]">
          <h1 className="pl-[5px] text-[20px] bg-[#ece9e9] mt-[10px]">Chi tiết sản phẩm</h1>
          <Row>
            <Col className="w-[200px] pl-[5px] mt-[10px]">
              Danh mục
            </Col>
            <Col>
              Mĩ phẩm
            </Col>
          </Row>
        </div>
        <div>
          <h1 className="pl-[5px] text-[20px] bg-[#ece9e9]">Mô tả sản phẩm</h1>        
        </div>
      </div>

      <div>
        <div className="rounded-lg bg-[#ccc] p-5">
          <h2 style={{ fontWeight: "600" }}>Đánh giá sản phẩm</h2>
          <div className="h-10 bg-[#af5e5e]"></div>
          <div style={{ padding: "5px 10px" }}>
          <IsLoadingComponent isLoading={IsLoadingProductDetailReview}>
          {productReview?.map((item) => 
            <div className="mt-3">
              <div className="flex " style={{alignItems: "start"}}>
                <Space Spacewrap size={10} className="mt-2">
                  <Avatar size="large" src={item.avatar} />
                </Space>
                <div className="ml-3">
                  <p>{item.userName}</p>
                  <div className="">
                    <Rate tooltips={desc} disabled value={item.rating} />
                  </div>
                  <div
                    className="flex text-center"
                    style={{ alignItems: "center" }}
                  >
                    <div>Thời gian: {formatDate(item.date)}</div>
                    {item?.size?.length > 0 ? (
                      <>
                      <div className=" h-5 w-[2px] bg-[#c12c2c]" style={{margin: '0 5px'}}></div>
                      <div>Phân loại hàng: {item.size}</div>
                      </>
                    ): ''}
                  </div>
                  <div>Màu sắc: <span>đen</span></div>
                  <div>Bình luận: {item.comments}</div>
                </div>
              </div>
            </div>
          )}
          </IsLoadingComponent>
          </div>
        </div>
      </div>


    </IsLoadingComponent>
    
  );
}
