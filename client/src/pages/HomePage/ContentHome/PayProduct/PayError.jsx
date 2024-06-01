import { Button } from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
export default function PayError() {
    const navigate = useNavigate()
    const handleButton = () => {
        navigate('/')
    }
  return (
    <div className='md:p-pad-md mt-4 px-[10px]'>
    <div className='bg-bg-nen h-[400px] flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center p-3'> 
            <ErrorOutlineIcon sx={{ fontSize: 80, color: '#11f800', marginBottom: '10px' }}/>
            <div className='mb-[10px]'>Đơn hàng bạn đã đặt thất bại</div>
            <Button variant="contained" onClick={handleButton}>Quay lại trang chủ</Button>
        </div>
    </div>
</div>
  )
}
