import { Spin } from 'antd'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'; 
export default function Loading(children, isLoading, delay ) {
  return (
    <Spin size="small"  spinning={isLoading} delay={delay}>
        
    </Spin>
  )
}
