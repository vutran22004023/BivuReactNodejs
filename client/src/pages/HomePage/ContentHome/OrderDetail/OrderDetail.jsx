import React,{useState } from 'react'
import TabContext from "@mui/lab/TabContext";
import {
  Box,
  Tab,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import { useSelector } from 'react-redux';
import {useQuery} from '@tanstack/react-query'
import {OrderProduct}  from '../../../../services/index'
export default function OrderDetail() {
  const [value, setValue] = useState("1");
  const user = useSelector((state) => state.user);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchOrderDetailUser = async() => {
    const id = user?.id
    const access_Token =  user?.access_Token.split("=")[1];
    const res = await OrderProduct.getDetailOrder(id, access_Token)
    return res
  }

  const { data: productsLimit, isLoading: isLoadingProductsLimit} = useQuery({ queryKey: ['orderDetailUser'], queryFn: fetchOrderDetailUser,enabled: Boolean(user?.id && user?.access_Token)});

  console.log(productsLimit)

  return (
    <div className='mt-5 w-full p-pad-sm md:p-pad-md'>
      <TabContext value={value}>
            <Box sx={{ borderBottom: 0.5, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Tất cả" value="1" />
                <Tab label="Chờ thanh toán" value="2" />
                <Tab label="Vận chuyển" value="3" />
                <Tab label="Chờ giao hàng" value="4" />
                <Tab label="Hoàn thành" value="5" />
                <Tab label="Trả hàng/ Hoàn tiền" value="6" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ p: '15px 0' }}>
            <div>1</div>
            </TabPanel>
            <TabPanel value="2" sx={{ p: '15px 0' }}>
            <div>2</div>
            </TabPanel>
            <TabPanel value="3" sx={{ p: '15px 0' }}>
            <div>2</div>
            </TabPanel>
            <TabPanel value="4" sx={{ p: '15px 0' }}>
            <div>2</div>
            </TabPanel>
            <TabPanel value="5" sx={{ p: '15px 0' }}>
            <div>2</div>
            </TabPanel>
            <TabPanel value="6" sx={{ p: '15px 0' }}>
            <div>2</div>
            </TabPanel>
          </TabContext>
    </div>
  )
}
