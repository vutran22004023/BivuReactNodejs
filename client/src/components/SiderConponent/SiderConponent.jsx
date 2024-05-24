import React from 'react'
import Slider from "react-slick";

export default function SiderConponent({arrImage,handleImageLoad}) {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
      };
      const safeArrImage = Array.isArray(arrImage) ? arrImage : [];
  return (
    <Slider {...settings}>

        {safeArrImage.map((image, index) => (
          <React.Fragment key={index}>
            <img className='image-sider w-full h-[140px] md:h-[450px]' onLoad={handleImageLoad} src={image} key={image} alt='slider' preview={false}  />
          </React.Fragment>  
        )) }
    </Slider>
  )
}
