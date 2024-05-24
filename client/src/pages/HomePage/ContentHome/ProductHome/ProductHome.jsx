import React, {useEffect, useState,useRef} from 'react'
import SiderConponent from '../../../../components/SiderConponent/SiderConponent'
import CardComponent from '../../../../components/CardComponent/CardComponent'
import { Button, Col, Row, Image  } from 'antd'
import { WapperButton } from './style'
import {useQuery} from '@tanstack/react-query'
import {ProductService,InformationPageService}from '../../../../services/index'
import IsLoadingCardComponent from '../../../../components/LoadComponent/LoadingCard'
import { buildModel, trainModel, recommendProducts } from '../../../../utils';
import IsLoadingSideComponent from '../../../../components/LoadComponent/LoadingSlide'
import IsLoadingAdvertisement from '../../../../components/LoadComponent/LoadingAdvertisement'
export default function ProductHome() {
  const [limit, setLimit] = useState(20)
  const [dataImageSide, setDataImageSide] = useState([])
  const [products, setProducts] = useState([]);
  const [userPreferences, setUserPreferences] = useState([]);
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [model, setModel] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);
  const fetchProductAllLimit = async (context) => {
    const limit = context.queryKey[1]
    const search = ''
    const sort = ''
    const page = ''
      const res = await ProductService.getAllProduct(limit,search,page,sort);
      return res; 
  }

  const fetchInformationAll = async () => {
    const res = await InformationPageService.getAllInforPage();
    return res; 
  }

  const { data: productsLimit, isLoading: isLoadingProductsLimit, isPreviousData } = useQuery({ queryKey: ['productsLimit', limit], queryFn: fetchProductAllLimit,keepPreviousData: true, retry:3, retryDelay: 1000 });
  const { data: dataInfor, isLoading: isLoadingDataInfor } = useQuery({ queryKey: ['dataInformationPage'], queryFn: fetchInformationAll});
  console.log(dataInfor)
  useEffect(()=> {
    const ImagesSiderComponent = dataInfor?.data[0]?.image_slider?.map((imageSlider) => imageSlider)
    setDataImageSide(ImagesSiderComponent)
    setLoadingImages(true);
  },[dataInfor])

  const handleImageLoad = () => {
    setLoadingImages(false); // Set loading state to false once the images are loaded
  };


  const convertProductToFeatures = (product) => {
    return [
      product.type
    ];
  };
  

// Khởi tạo mô hình và huấn luyện mô hình
useEffect(() => {
  if (!productsLimit) return; // Đảm bảo rằng dữ liệu đã được tải trước khi tiếp tục
  setProducts(productsLimit.data);
  const inputSize = 1; // Sử dụng 1 đặc trưng
  const outputSize = productsLimit.data.length;
  const model = buildModel(inputSize, outputSize); // Sử dụng dữ liệu thực tế từ productsLimit
  setModel(model);

  // Huấn luyện mô hình một lần
  const trainingData = products.map(convertProductToFeatures);
  const trainingLabels = products.map((_, idx) => {
    const label = Array(products.length).fill(0);
    label[idx] = 1;
    return label;
  });

  trainModel(model, trainingData, trainingLabels).then(() => {
    console.log('Training complete');
  });
}, [productsLimit]);

// Gợi ý sản phẩm
useEffect(() => {
  if (model && userPreferences.length > 0 && products.length > 0) {
    const recommendedIndex = recommendProducts(model, userPreferences);
    console.log('Recommended index:', recommendedIndex);
    setRecommendedProduct(products[recommendedIndex]);
  }
}, [model, userPreferences, products]);
// Xử lý khi người dùng click vào sản phẩm
const handleProductClick = (product) => {
    setUserPreferences((prevUserPreferences) => {
      const updatedPreferences = [...prevUserPreferences, product.type];

      localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
      return updatedPreferences;
    });
  };


  return (
    <div id='container' className='p-pad-sm md:p-pad-md mt-4 bg-[rgb(235 232 232)]'>
        {isLoadingDataInfor  ? (
          <IsLoadingSideComponent></IsLoadingSideComponent>
        ) : (
          <>
          <Row>
          <Col span={16} className='px-2 md:px-0 md:pr-3.5 h-[140px] md:h-[450px]'>

            <SiderConponent arrImage = {dataImageSide} isLoaidng ={handleImageLoad}/>
          </Col>
          <Col span={8} style={{width: '100px'}} className='pl-0 md:pl-2.5'>
              {dataInfor?.data[0]?.image_right?.map((imageSlider, index) => (
                <React.Fragment key={index}>
                  <img src={imageSlider} onLoad={handleImageLoad}  preview={false} className='w-full h-[65px] md:h-[215px] rounded-lg mb-2'/>
                </React.Fragment>
              ))}
          </Col>
        </Row>  
        <Row style={{marginTop:'10px'}} gutter={[16, 16]}>
          {dataInfor?.data[0]?.image_bottom?.map((imageSlider, index) => (
            <>
            <Col span={8}>
            <React.Fragment key={index} className="rounded-md overflow-hidden">
              <img src={imageSlider} onLoad={handleImageLoad} preview={false} className="w-full h-[75px] md:h-[200px] rounded-lg" />
            </React.Fragment>
          </Col>
            </>
          ))}
        </Row>
          </>
        )}

        {isLoadingDataInfor  ? (
          <IsLoadingAdvertisement></IsLoadingAdvertisement>
        ): (
          <div className='mt-6'>
          <div>
            <React.Fragment  className="rounded-md overflow-hidden">
              <img src={dataInfor?.data[0]?.image_qc_1} onLoad={handleImageLoad} preview={false} className="w-full h-[75px] md:h-[150px]" style={{borderRadius: '10px 10px 0 0'}} />
            </React.Fragment>
          </div>
          <div>
            <React.Fragment  className="rounded-md overflow-hidden">
              <img src={dataInfor?.data[0]?.image_qc_2} onLoad={handleImageLoad} preview={false} className="w-full h-[75px] md:h-[150px]" />
            </React.Fragment>
          </div>
          <div className='flex'>
              <div className='w-full'>
              <React.Fragment  className="rounded-md overflow-hidden">
              <img src={dataInfor?.data[0]?.image_qc_3} onLoad={handleImageLoad} preview={false} className="w-full h-[75px] md:h-[150px]"  style={{borderRadius: '0 0 0 10px'}} />
            </React.Fragment>
              </div>
              <div className='w-full'>
              <React.Fragment  className="">
              <img src={dataInfor?.data[0]?.image_qc_4} onLoad={handleImageLoad} preview={false} className="w-full h-[75px] md:h-[150px]" style={{borderRadius: '0 0 10px 0'}} />
            </React.Fragment>
              </div>
          </div>
        </div>
        )}
        
        
        {isLoadingProductsLimit ? (
          <IsLoadingCardComponent></IsLoadingCardComponent>
        ): (
          <>
          <div className='grid grid-cols-4 gap-2 mb-3 mt-3 md:grid-cols-6 md:gap-4'>
        
          { products.map((product,index)=> {
            return (
              <>
              
              <CardComponent
              key={product._id}
              description={product.description}
              image ={product.image}
              name = {product.name}
              categorySize = {product.categorySize}
              rating = {product.rating}   
              type = {product.type}
              discount = {product.discount}
              slug = {product.slug}
              selled = {product.selled}
              id = {product._id}

              onClick={() => handleProductClick(product)}
              />
              </>
            )
          })}


        </div>
          {isPreviousData ? (
            <IsLoadingCardComponent style={{marginTop: '10px'}}></IsLoadingCardComponent>
          ): ''}
        </>
        )}
        
        {/* </IsLoadingComponent> */}
        <div style={{width:'100%', display: 'flex', justifyContent: 'center',marginTop: '10px'}}>
          <WapperButton 
          disabled={productsLimit?.total === productsLimit?.data?.length}
          size='ouline' onClick={() =>  setLimit((prev) =>prev+ 6 )}>Xem thêm</WapperButton>
        </div>

    </div>
  )
}
