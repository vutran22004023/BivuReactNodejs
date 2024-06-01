import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function PaySuccess() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user);
    const handleButton = () => {
        navigate(`/don-hang/${user.id}`, {
            state: {
              id: user.id,
             token:user.access_Token,
            }
          })
    }
  return (
    <div className='md:p-pad-md mt-4 px-[10px]'>
    <div className='bg-bg-nen h-[400px] flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center p-3'> 
            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#11f800', marginBottom: '10px' }}/>
            <div className='mb-[10px]'>Bạn đã đặt hàng thành công</div>
            <Button variant="contained" onClick={handleButton}>Xem chi tiết đơn hàng</Button>
        </div>
    </div>
</div>
  )
}
