/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Table } from 'antd';






export default function  OrderTable  (props) {
  const {products, columns} =props
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const data = products?.map((product) => {
    return {
      ...product,
      key: product._id,
    }

  })

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;


  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={{
      pageSize: 50,
    }}
    scroll={{
      y: 490,
    }}
    {...props}
     />
  )
};

