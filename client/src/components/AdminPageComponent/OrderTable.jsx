/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Table } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import ModalComponent from '../../components/ModalComponent/Modal.jsx'
import LoadingComponent from '../../components/LoadComponent/Loading.jsx'
import { UploadOutlined, WarningOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {paginationPage} from '../../redux/Slides/pagination.js'
export default function  OrderTable  (props) {
  const dispathch = useDispatch()
  const {products, columns, handleDeleteMany,dataDeleteisLoadingMany, dataDeleteMany,total,pageCurrent,totalPages} =props
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const handleCancelDelete = () =>{
    setIsModalOpenDelete(false)
  }
  const openModalDelete = () => {
    setIsModalOpenDelete(true)
    console.log(rowSelectedKeys)
  }
  const data = products?.map((product) => {
    return {
      ...product,
      key: product._id,
    }
  })
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setRowSelectedKeys(newSelectedRowKeys);
  };
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };
  // const hasSelected = selectedRowKeys.length > 0;
  const onHandleDeleteMany = () => {
    handleDeleteMany(rowSelectedKeys)
    if(dataDeleteMany.status === 200) {
      setIsModalOpenDelete(false)
    }
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const onPageChange = (page) => {
    if(page) {
      dispathch(paginationPage({page}))
    }
  }

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={openModalDelete}>
          Xóa dữ liệu trong checkbox
        </a>
        
      ),
    },
  ];


  return (
    <>
     <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
        disabled={rowSelectedKeys.length > 0 ? false : true}
      >
        <Button style={{marginBottom: 10}} >Lựa chọn</Button>
      </Dropdown>
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} 
    pagination={{
      pageSize: 50,
      total: total,
      current:pageCurrent || 1,
      onChange: onPageChange
    }}
    scroll={{
      y: 430,
    }}
    {...props}
     />

        <ModalComponent isOpen={isModalOpenDelete} onOk={onHandleDeleteMany} onCancel={handleCancelDelete}>
          <LoadingComponent isLoading={dataDeleteisLoadingMany} >
        <div style={{textAlign: "center"}}>
          <WarningOutlined style={{fontSize: '50px', color: 'red'}} />
          <p>bạn có chắc chắn xóa dữ liệu này không?</p>
          {rowSelectedKeys.map((data)=> {
            return (
              <p>{data}</p>
            )
          })}
        </div>
        </LoadingComponent>
        </ModalComponent>
     </>
  )
};

