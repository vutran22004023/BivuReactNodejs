import React from "react";
import "../../assets/font-end/css/Home.css";
import { Col, Row } from "antd";

export default function LoadingAdvertisement() {
  return (
    <div className="mt-6">
      <div>
        <div className="movie--isloading-Advertisement">
          <div className="loading-image" style={{borderRadius: '10px 10px 0 0'}}></div>
        </div>
      </div>
      <div>
      <div className="movie--isloading-Advertisement">
          <div className="loading-image"></div>
        </div>
      </div>
      <div className="flex">
        <div className="w-full">
        <div className="movie--isloading-Advertisement">
          <div className="loading-image" style={{borderRadius: '0 0 0 10px'}}></div>
        </div>
        </div>
        <div className="w-full">
        <div className="movie--isloading-Advertisement">
          <div className="loading-image" style={{borderRadius: '0 0 10px 0'}}></div>
        </div>
        </div>
      </div>
    </div>
  );
}
