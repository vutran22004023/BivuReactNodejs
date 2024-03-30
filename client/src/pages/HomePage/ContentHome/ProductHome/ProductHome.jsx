import React from 'react'
import Sider1 from '../../../../assets/font-end/imgs/slides/side1.png'
import Sider2 from '../../../../assets/font-end/imgs/slides/side2.png'
import SiderConponent from '../../../../components/SiderConponent/SiderConponent'
import CardComponent from '../../../../components/CardComponent/CardComponent'
import { Button, Col, Row, Image } from 'antd'
import { WapperButton } from './style'
import product1 from '../../../../assets/font-end/imgs/Product/product1.png'
import {useQuery} from '@tanstack/react-query'
import {ProductService}from '../../../../services/index'
export default function ProductHome() {

  const fetchProductAll = async() => {
    
    const res =  await ProductService.getAllProduct()
    return res
  }

  const { isLoading, data:products } = useQuery({queryKey: ['products'], queryFn: fetchProductAll, retry:3, retryDelay: 1000});
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
        <div style={{marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent:'space-around',flexWrap: 'wrap'}}>
          {products?.data?.map((product)=> {
            return (
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
              />
            )
          })}
        </div>
        <div style={{width:'100%', display: 'flex', justifyContent: 'center',marginTop: '10px'}}>
          <WapperButton size='ouline'>Xem thêm</WapperButton>
        </div>
    </div>
  )
}
