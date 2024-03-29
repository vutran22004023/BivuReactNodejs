import React, { Fragment } from 'react'
import NavBarComponent from '../../../../components/NavBarComponent/NavBarComponent'
import { Col, Pagination, Row } from 'antd';
import { WapperCategory } from './style';
import CardConponent from '../../../../components/CardComponent/CardComponent';
export default function CategoryHome() {
  return (
    <div style= {{margin: '10px 100px',backgroundColor: 'rgb(235 232 232)', padding: '10px'}}>
      <WapperCategory >
      <Col span={5} style={{width: '100%',backgroundColor: '#fff', marginRight: '10px'}}>
        <NavBarComponent />
      </Col>
      <Col span={19} style={{display: 'grid', alignItems: 'center',gridTemplateColumns: 'repeat(5 ,1fr)',}}>
        <CardConponent />
        <CardConponent />
        <CardConponent />
        <CardConponent />
        <CardConponent />
        <CardConponent />
      </Col>
    </WapperCategory>
    <Pagination style={{width: '100%', justifyItems: 'center', textAlign:'center'}} defaultCurrent={6} total={500}/>
    </div>
  );
}
