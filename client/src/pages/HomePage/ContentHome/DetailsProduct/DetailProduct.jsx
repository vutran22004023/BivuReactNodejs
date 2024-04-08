import React from 'react'
import {useParams} from 'react-router-dom'
import ProductDetail from '../../../../components/ProductDetails/ProductDetail'

export default function DetailProduct() {
  const {id} = useParams()
  return (
    <div style={{margin: '10px 100px'}}>
      <h5>
        Trang chu
      </h5>
      <div style={{backgroundColor: '#fff'}}>
        <ProductDetail idProduct ={id}/>
      </div>
    </div>
  )
}
