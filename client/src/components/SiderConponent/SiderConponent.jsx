import React from 'react'
import Slider from "react-slick";

export default function SiderConponent({arrImage,handleImageLoad, classNameStyle}) {
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
            <img className={classNameStyle} onLoad={handleImageLoad} src={image} key={image} alt='slider' preview={false}  />
          </React.Fragment>  
        )) }
    </Slider>
  )
}
