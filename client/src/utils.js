import React, { useEffect, useRef, useState } from "react";
import * as tf from '@tensorflow/tfjs';
export const isJsonString = (data) => {
    try {
        JSON.parse(data)
        return data
    }catch (e) {
        return false;
    }
    return true
}




export const getBase64 = (file) =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});


export function openSidebar() {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
    }
  }
  
  export function closeSidebar() {
    if (typeof window !== 'undefined') {
      document.documentElement.style.removeProperty('--SideNavigation-slideIn');
      document.body.style.removeProperty('overflow');
    }
  }
  
  export function toggleSidebar() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const slideIn = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--SideNavigation-slideIn');
      if (slideIn) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }
  }

  export const renderOptions = (arr) => {
    let results = []; // Sử dụng let thay cho const
    if (arr) {
      results = arr?.map((opt) => {
        return {
          value: opt,
          label: opt,
        };
      });
    }
    results.push({
      label: 'Thêm type',
      value: 'add_type',
    });
    return results;
  };

  export const handleScroll = (setSticky) => {
    useEffect(() => {
      const handleScroll = () => {
        const topHeight = document.querySelector(".wrapper-header-top")
          ?.clientHeight || 0;
        const isStickyHeader = window.pageYOffset > topHeight;
        setSticky(isStickyHeader);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    return null;
  };

export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(',','.')
    return `${result} VND`
  }catch(e) {
    return null;
  }
} 

export const vietnameseToSlug = (str) => {
  try{
    str = str.toLowerCase();
  
    // Xóa dấu và ký tự đặc biệt
    const fromChars = "àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ";
    const toChars = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
  for (let i = 0; i < fromChars.length; i++) {
    str = str.replace(new RegExp(fromChars.charAt(i), 'g'), toChars.charAt(i));
  }

  // Xóa các ký tự không phải chữ cái hoặc số
  str = str.replace(/[^a-z0-9\s-]/g, '');

  // Chuyển khoảng trắng thành dấu gạch ngang
  str = str.replace(/\s+/g, '-');

  // Xóa dấu gạch ngang ở đầu và cuối chuỗi
  str = str.replace(/^-+/g, '').replace(/-+$/g, '');
  return str;
  }catch(err) {
    return null
  }
}


// Hàm để xây dựng mô hình
export const buildModel = (inputSize, outputSize) => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [inputSize] }));
  model.add(tf.layers.dense({ units: outputSize, activation: 'softmax' }));
  model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });
  return model;
};
