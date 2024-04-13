import React, { useEffect, useRef, useState } from "react";
export const isJsonString = (data) => {
    try {
        JSON.parse(data)
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