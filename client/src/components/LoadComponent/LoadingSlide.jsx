import React from 'react'
import "../../assets/font-end/css/Home.css";
import { Col, Row } from 'antd';
export default function LoadingSlide({classNameSlide}) {
  return (
    <>
        <Row>
          <Col span={16} className='px-2 md:px-0 md:pr-3.5 h-[140px] md:h-[450px]'>
          <div className="movie--isloading-slide">
            <div className="loading-image"></div>
         </div>
          </Col>
          <Col span={8} style={{width: '100px'}} className='pl-0 md:pl-2.5'>
          <div className="movie--isloading-ImageRight">
            <div className="loading-image"></div>
         </div>
         <div className="movie--isloading-ImageRight">
            <div className="loading-image"></div>
         </div>
          </Col>
        </Row>
        <Row style={{marginTop:'10px'}} gutter={[16, 16]}>
        <Col span={8}>
        <div className="movie--isloading-Bottom">
            <div className="loading-image"></div>
         </div>
         </Col>
         <Col span={8}>
        <div className="movie--isloading-Bottom">
            <div className="loading-image"></div>
         </div>
         </Col>
         <Col span={8}>
        <div className="movie--isloading-Bottom">
            <div className="loading-image"></div>
         </div>
         </Col>
        </Row>
    </>
    // <div className="gutter-row">
    //     <div className={`movie--isloading-slide ${classNameSlide}`} >
    //       <div className="loading-image"></div>
    //     </div>
    //   </div>
  )
}
