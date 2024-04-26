import React from 'react'
import Slider from "react-slick";

export default function SiderConponent({arrImage}) {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
      };
  return (
    <Slider {...settings}>
        {arrImage.map((image) => {
            return (
                <img className='image-sider w-full h-[140px] md:h-[450px]' src={image} key={image} alt='slider' preview={false}  />
            )
        }) }
    </Slider>
  )
}
