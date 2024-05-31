import React, { useEffect, useState } from "react";
import {
  Col,
  Pagination,
  Row,
  Button,
  Radio,
  Flex,
  Dropdown,
  Space,
  Rate,
} from "antd";
import { WapperCategory, CustomRadioButton } from "./style";
import CardComponent from "../../../../components/CardComponent/CardComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductService, ReviewService } from "../../../../services/index.js";
import IsLoadingComponent from "../../../../components/LoadComponent/Loading.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useMutationHooks } from "../../../../hooks/UseMutationHook.js";
import SiderConponent from '../../../../components/SiderConponent/SiderConponent'
export default function CategoryHome() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);
  const infor = useSelector((state) => state.information);
  const [isLoadingres, setIsLoadingres] = useState(false);
  const [valueCategory, setValueCategory] = useState(state);
  const [valueRate, setvalueRate] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [valueRadioArrange, setvalueRadioArrange] = useState("asc");
  const [dataselling, setDataSelling] = useState([]);
  const [datasllingpricebigtosmall, setDataSllingPricebigtosmall] = useState([])
  const [datasllingpricesmalltobig, setDataSllingPricesmalltoBig] = useState([])
  const onChangeArrange = (e) => {
    setvalueRadioArrange(e.target.value);
  };
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });
  const onChangeCategory = (e) => {
    setValueCategory(e.target.value);
    navigate(
      `/danh-muc/${e.target.value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "_")}`,
      { state: e.target.value },
    );
  };

  useEffect(() => {
    const sort = "asc";
    if (valueCategory) {
      fetchProductType(valueCategory, panigate?.page, panigate?.limit, sort);
    } else {
      fetchProductType(state, panigate?.page, panigate?.limit, sort);
    }
  }, [valueCategory]);

  useEffect(() => {
    if (valueRadioArrange === "asc") {
      setDataSelling([]);
      setDataSllingPricebigtosmall([])
      setDataSllingPricesmalltoBig([])
      const sort = "asc";
      fetchProductType(valueCategory, panigate?.page, panigate?.limit, sort);
    } else if (valueRadioArrange === "desc") {
      setDataSelling([]);
      setDataSllingPricebigtosmall([])
      setDataSllingPricesmalltoBig([])
      const sort = "desc";
      fetchProductType(valueCategory, panigate?.page, panigate?.limit, sort);
    } else if (valueRadioArrange === "selling") {
      const sortedBySelled = products?.data?.sort(
        (a, b) => b.selled - a.selled,
      );
      setDataSelling(sortedBySelled);
    }
  }, [valueRadioArrange]);

  const handleMenuClick = (e) => {
    if(e.key === '1') {
      setDataSllingPricesmalltoBig([])
      const sortedBySelled = products?.data?.sort(
        (a, b) => b.categorySize[0].price - a.categorySize[0].price,
      );
      setDataSllingPricebigtosmall(sortedBySelled)
    }else if(e.key === '2') {
      setDataSllingPricebigtosmall([])
      const sortedBySelled = products?.data?.sort(
        (a, b) => a.categorySize[0].price - b.categorySize[0].price,
      );
      setDataSllingPricesmalltoBig(sortedBySelled)
    }
  };
  const onChangeRate = (e) => {
    setvalueRate(e.target.value);
  };
  const fetchProductType = async (type, page, limit, sort) => {
    const res = await ProductService.getProductType(type, page, limit, sort);
    if (res?.status === 200) {
      setProduct(res);
      setPanigate({ ...panigate, total: res?.totalPage });
      setIsLoadingres(false);
    }
    return res;
  };
  const fetchTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };
  const { data: productType, isLoading: isLoadingProductType } = useQuery({
    queryKey: ["productsType"],
    queryFn: fetchTypeProduct,
  });

  useEffect(() => {
    if (valueRate) {
      const fetchFilteredReviews = async () => {
        try {
          const res = await ReviewService.getReviewProductAll();
          const reviews = res?.data || [];
          const filterReview = reviews.filter(
            (review) => review.rating === valueRate,
          );

          const filteredProducts = products?.data?.filter((product) =>
            filterReview.some((review) => review.productId === product._id),
          );

          setFilteredProducts(filteredProducts);
        } catch (error) {
          console.error("Error fetching reviews: ", error);
          setFilteredProducts([]);
        }
      };

      fetchFilteredReviews();
    } else {
      setFilteredProducts(products?.data || []);
    }
  }, [valueRate, products]);
  useEffect(() => {
    if (state) {
      setIsLoadingres(true);
      const sort = "asc";
      fetchProductType(state, panigate?.page, panigate?.limit, sort);
    }
  }, [state, panigate?.page, panigate?.limit]);

  const onShowSizeChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };


  const items = [
    {
      label: <span style={{ margin: "5 20px" }}>Giá: Thấp đến Cao</span>,
      key: "1",
    },
    {
      label: "Giá: Cao đến thấp",
      key: "2",
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <IsLoadingComponent isLoading={isLoadingres}>
      <div className="bg-[rgb(235 232 232)] mt-6 md:p-pad-md">
        <WapperCategory>
          <Col
            span={5}
            style={{
              width: "100%",
              backgroundColor: "#fff",
              marginRight: "10px",
            }}
          >
            <div className="mb-6 text-[16px] font-semibold md:text-[20px]">
              Bộ Lọc Tìm Kiếm
            </div>
            <div className="">
              <div className="mb-3 text-[12px] md:text-[16px]">
                Theo danh mục
              </div>
              <div className="p-2">
                <Radio.Group onChange={onChangeCategory} value={valueCategory}>
                  <Space direction="vertical">
                    {productType?.data?.map((item) => (
                      <Radio value={item}>{item}</Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-3 text-[12px] md:text-[16px]">Đánh giá</div>
              <div className="p-2">
                <Radio.Group onChange={onChangeRate} value={valueRate}>
                  <Space direction="vertical">
                    <Radio value={5}>
                      <Rate disabled defaultValue={5} />
                    </Radio>
                    <Radio value={4}>
                      <Rate disabled defaultValue={4} />
                    </Radio>
                    <Radio value={3}>
                      <Rate disabled defaultValue={3} />
                    </Radio>
                    <Radio value={2}>
                      <Rate disabled defaultValue={2} />
                    </Radio>
                    <Radio value={1}>
                      <Rate disabled defaultValue={1} />
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>
            </div>
          </Col>

          <Col span={19}>
          <div>
            <SiderConponent classNameStyle='image-sider w-full h-[140px] md:h-[200px] mb-4' arrImage = {infor.image_slider}/>
          </div>
            <div className="mb-6 text-[16px] font-medium">
              Kết quả tìm kiếm cho từ khóa{" "}
              <span className="text-[16px] font-semibold text-[red] md:text-[20px]">
                "{valueCategory}"
              </span>
            </div>
            <div className="rounded-sm bg-[#dfdddd] p-5">
              <div className="flex" style={{ alignItems: "center" }}>
                <div className="mr-3"> Sắp xếp theo</div>
                <Radio.Group
                  onChange={onChangeArrange}
                  value={valueRadioArrange}
                  size="large"
                >
                  <CustomRadioButton
                    style={{ borderRadius: "0px" }}
                    value="asc"
                  >
                    Liên quan
                  </CustomRadioButton>
                  <CustomRadioButton
                    style={{ borderRadius: "0px" }}
                    value="desc"
                  >
                    Mới nhất
                  </CustomRadioButton>
                  <CustomRadioButton
                    style={{ borderRadius: "0px" }}
                    value="selling"
                  >
                    Bán chạy
                  </CustomRadioButton>
                </Radio.Group>

                <Dropdown menu={menuProps}>
                  <Button
                    style={{ borderRadius: "0px" }}
                    className="h-[40px] w-[100px]"
                  >
                    Giá
                  </Button>
                </Dropdown>
              </div>
            </div>
            <div className="mb-3 mt-3 grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-3">
              {filteredProducts.length > 0
                ? filteredProducts.map((product, index) => (
                    <CardComponent
                      key={product._id}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      categorySize={product.categorySize}
                      rating={product.rating}
                      type={product.type}
                      discount={product.discount}
                      slug={product.slug}
                      selled={product.selled}
                      id={product._id}
                    />
                  ))
                : dataselling.length > 0
                  ? dataselling.map((product, index) => (
                      <CardComponent
                        key={product._id}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        categorySize={product.categorySize}
                        rating={product.rating}
                        type={product.type}
                        discount={product.discount}
                        slug={product.slug}
                        selled={product.selled}
                        id={product._id}
                      />
                    ))
                    : datasllingpricebigtosmall.length > 0
                  ? datasllingpricebigtosmall.map((product, index) => (
                      <CardComponent
                        key={product._id}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        categorySize={product.categorySize}
                        rating={product.rating}
                        type={product.type}
                        discount={product.discount}
                        slug={product.slug}
                        selled={product.selled}
                        id={product._id}
                      />
                    ))
                    : datasllingpricesmalltobig.length > 0
                  ? datasllingpricesmalltobig.map((product, index) => (
                      <CardComponent
                        key={product._id}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        categorySize={product.categorySize}
                        rating={product.rating}
                        type={product.type}
                        discount={product.discount}
                        slug={product.slug}
                        selled={product.selled}
                        id={product._id}
                      />
                    ))
                  : products?.data?.map((product, index) => (
                      <CardComponent
                        key={product._id}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        categorySize={product.categorySize}
                        rating={product.rating}
                        type={product.type}
                        discount={product.discount}
                        slug={product.slug}
                        selled={product.selled}
                        id={product._id}
                      />
                    ))}
            </div>
          </Col>
        </WapperCategory>
        <Pagination
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          style={{ width: "100%", justifyItems: "center", textAlign: "center" }}
          defaultCurrent={panigate?.page + 1}
          total={panigate?.total}
        />
      </div>
    </IsLoadingComponent>
  );
}
