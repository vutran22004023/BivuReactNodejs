import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../../../../components/ProductDetails/ProductDetail";

export default function DetailProduct() {
  const { id } = useParams();
  return (
    <div className='md:p-pad-md mt-4 px-[10px]'>
      <div>

        <ProductDetail idProduct ={id}/>
      </div>
    </div>
  );
}
