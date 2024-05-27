import React, { useEffect,useState } from 'react'
import NavBarComponent from '../../../../components/NavBarComponent/NavBarComponent'
import { Col, Pagination, Row } from 'antd';
import { WapperCategory } from './style';
import CardComponent from '../../../../components/CardComponent/CardComponent';
import {useLocation} from 'react-router-dom'
import { ProductService } from "../../../../services/index.js";
import IsLoadingComponent from '../../../../components/LoadComponent/Loading.jsx'
export default function CategoryHome() {
  const {state} = useLocation()
  const [products, setProduct] = useState([])
  console.log(products)
  const [isLoadingres,setIsLoadingres] = useState(false)
  const [panigate, setPanigate] = useState({
    page : 0,
    limit: 10,
    total: 1
  })
  const fetchProductType =  async(type, page, limit) => {
    const res = await ProductService.getProductType(type,page, limit )
    console.log(res)
    if(res?.status === 200) {
      setProduct(res)
      setPanigate({...panigate, total: res?.totalPage})
      setIsLoadingres(false)
    }
    return res
  }
  useEffect(() =>{
    if(state) {
      setIsLoadingres(true)
      fetchProductType(state, panigate?.page, panigate?.limit)
    }
  },[state, panigate?.page,panigate?.limit])

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    setPanigate({...panigate, page: current-1, limit:pageSize} )
  };


  return (
    <IsLoadingComponent isLoading={isLoadingres}>
    <div 
    className='md:p-pad-md mt-4 bg-[rgb(235 232 232)]'
    >

      <WapperCategory >
      <Col span={5} style={{width: '100%',backgroundColor: '#fff', marginRight: '10px'}}>
        <NavBarComponent />
      </Col>

      <Col span={19} style={{display: 'grid', alignItems: 'center',gridTemplateColumns: 'repeat(5 ,1fr)',}}>
      { products?.data?.map((product, index) => (
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
          )}
      </Col>
    </WapperCategory>
    <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} style={{width: '100%', justifyItems: 'center', textAlign:'center'}} defaultCurrent={panigate?.page + 1} total={panigate?.total}/>

    </div>
    </IsLoadingComponent>
  );
}
