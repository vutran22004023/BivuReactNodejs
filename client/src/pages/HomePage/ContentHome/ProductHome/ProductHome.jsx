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
    <div id='container' style={{padding: ' 0 130px', marginTop: '20px' }}>
        <Row>
          <Col span={16} style={{padding: '10px 20px'}}><SiderConponent arrImage = {[Sider1,Sider2]}/></Col>
          <Col span={8} style={{width: '100px', padding: '10px'}}>
              <Image src={product1}  preview={false} height="200px" width={'100%'}/>
              <Image src={product1}  preview={false} height="200px" width={'100%'}/>
          </Col>
        </Row>
        <Row style={{marginTop:'10px'}}>
          <Col span={8}>
          <Image src={product1}  preview={false} height="250px" width={'100%'}/>
          </Col>
          <Col span={8}>
          <Image src={product1}  preview={false} height="250px" width={'100%'}/>
          </Col>
          <Col span={8}>
          <Image src={product1}  preview={false} height="250px" width={'100%'}/>
          </Col>
        </Row>

        {isLoadingProductsLimit ? (
          <IsLoadingCardComponent></IsLoadingCardComponent>
        ): (
          <>
          <div style={{marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent:'space-around',flexWrap: 'wrap'}}>
        
          { productsLimit?.data?.map((product,index)=> {
            return (
              <>
              
              <CardComponent
              key={product._id}
              counInStock ={product.counInStock}
              description={product.description}
              image ={product.image}
              name = {product.name}
              price = {product.price}
              rating = {product.rating}   
              type = {product.type}
              discount = {product.discount}
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
