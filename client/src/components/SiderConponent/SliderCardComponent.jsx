import React from 'react'
import Slider from "react-slick";
import CardComponent from '../CardComponent/CardComponent'


export const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };
  
  export const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };
export default function SiderConponent({products }) {
    var settings = {
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              },
            },
          ],
      };
  return (
    <Slider {...settings} >
        {products?.map((product, index) => (
          <div key={product._id} style={{ paddingRight: '20px' }}>
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
              </div>
        )) }
    </Slider>
  )
}
