import React, {useEffect, useState,useRef} from 'react'
import Sider1 from '../../../../assets/font-end/imgs/slides/side1.png'
import Sider2 from '../../../../assets/font-end/imgs/slides/side2.png'
import SiderConponent from '../../../../components/SiderConponent/SiderConponent'
import CardComponent from '../../../../components/CardComponent/CardComponent'
import IsLoadingComponent from '../../../../components/LoadComponent/Loading'
import { Button, Col, Row, Image  } from 'antd'
import { WapperButton } from './style'
import product1 from '../../../../assets/font-end/imgs/Product/product1.png'
import {useQuery} from '@tanstack/react-query'
import {ProductService}from '../../../../services/index'
import {useSelector,useDispatch} from 'react-redux'
import {useDebounce} from '../../../../hooks/UseMutationHook'
import {DataSearchProduct,IsloadingSearchProduct,IsloadingSearchProductFebounce} from '../../../../redux/Slides/productSlide'
import IsLoadingCardComponent from '../../../../components/LoadComponent/LoadingCard'
export default function ProductHome() {
  const [limit, setLimit] = useState(6)

  const fetchProductAllLimit = async (context) => {
    const limit = context.queryKey[1]
    const search = ''
      const res = await ProductService.getAllProduct(limit,search);
      return res; 
  }

  const { data: productsLimit, isLoading: isLoadingProductsLimit, isPreviousData } = useQuery({ queryKey: ['productsLimit', limit], queryFn: fetchProductAllLimit,keepPreviousData: true, retry:3, retryDelay: 1000 });

  return (
    <div id='container' className='p-pad-sm md:p-pad-md mt-4 bg-[rgb(235 232 232)]'>
        <Row>
          <Col span={16} style={{padding: '0 25px'}}>
            <SiderConponent arrImage = {[Sider1,Sider2]}/>
          </Col>
          <Col span={8} style={{width: '100px'}}>
              <img src={product1}  preview={false} className='w-full h-[50px] md:h-[200px]'/>
              <img src={product1}  preview={false} className='w-full h-[50px] md:h-[200px]'/>
          </Col>
        </Row>
        <Row style={{marginTop:'10px'}}>
          <Col span={8}>
          <img src={product1}  preview={false} className='w-full h-[75px] md:h-[200px]'/>
          </Col>
          <Col span={8}>
          <img src={product1}  preview={false} className='w-full h-[75px] md:h-[200px]'/>
          </Col>
          <Col span={8}>
          <img src={product1}  preview={false} className='w-full h-[75px] md:h-[200px]'/>
          </Col>
        </Row>

        {isLoadingProductsLimit ? (
          <IsLoadingCardComponent></IsLoadingCardComponent>
        ): (
          <>
          <div className='grid grid-cols-3 gap-2 mb-3 md:grid-cols-6 md:gap-4'>
        
          { productsLimit?.data?.map((product,index)=> {
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
