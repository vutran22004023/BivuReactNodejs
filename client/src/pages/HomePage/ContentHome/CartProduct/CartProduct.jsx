import React, { useState,useMemo,useEffect } from "react";
import { Col,Space, Divider, Row,InputNumber,Checkbox } from "antd";
import product1 from "../../../../assets/font-end/imgs/Product/product1.png";
import ButtonComponent from '../../../../components/ButtonSearch/Button'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {IncreaseAmount,DecreaseAmount,RemoveOrderProduct,removeAllOrderProduct,selectedOrder} from "../../../../redux/Slides/orderProductSlide";
import { convertPrice } from "../../../../utils";
import { useNavigate,useLocation  } from "react-router-dom";
import ModalComponentLogin from '../../../../components/ModalComponent/ModalLogin'
export default function CartProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()
    const [listChecked, setListChecked] = useState([])
    const dispatch = useDispatch()
    const location = useLocation();
    console.log(location)
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const handleChangeCount = (type, idProduct, limited) => {
      if(type === 'increase') {
        if(!limited) {
          dispatch(IncreaseAmount({idProduct}))
        }
      }else {
        if(!limited) {
          dispatch(DecreaseAmount({idProduct}))
        }
      }
    }
    const onChange = (e) => {
      if(listChecked.includes(e.target.value)){
        const newListChecked = listChecked.filter((item) => item !== e.target.value)
        setListChecked(newListChecked)
      }else {
        setListChecked([...listChecked, e.target.value])
      }
    };

    useEffect(() => {
      dispatch(selectedOrder({listChecked}))
    },[listChecked] )

    useEffect(() => {
      if(location.state?.listChecked) {
        setListChecked([...listChecked, location.state?.listChecked])
      }
    },[location.state?.listChecked])

    const handleOnchangeCheckAll = (e) => {
      if(e.target.checked) {
        const newListChecked = []
        order?.orderItems?.forEach((item) => {
          newListChecked.push(item?.product)
        })
        setListChecked(newListChecked)
      }else {
        setListChecked([])
      }
    }

    const handleChangeDeleteCheckAll = () => {
      if(listChecked?.length > 1){
        dispatch(removeAllOrderProduct({listChecked}))
      }
    }
    const handleAddCard = () => {
      if(order?.orderItemsSlected?.length && user?.id) {
        navigate('/mua-hang')
      }else if(!user?.id) {
        showModal()
      }
    }

    const priceMemo = useMemo(()=> {
      const result = order?.orderItemsSlected?.reduce((total, cur)=> {
        return total + ((cur.price * cur.amount))
      },0)
      return result
    },[order])

    const priceDiscountMemo = useMemo(()=> {
      const result = order?.orderItemsSlected?.reduce((total, cur)=> {
        return total + ((cur.discount * cur.amount))
      },0)
      if(Number(result)) {
        return result
      }
      return 0
    },[order])

    const diliveryPriceMemo = useMemo(()=> {
      if(priceMemo> 100000) {
        return 35000
      }else if(priceMemo){
        return 20000
      }
      return 0
    },[priceMemo])
    const totalPriceMemo = useMemo(()=> {
      return Number(priceMemo)  - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    },[priceMemo,priceDiscountMemo,diliveryPriceMemo])

    const handleDeteteOrder =(idProduct) => {
      dispatch(RemoveOrderProduct({idProduct}))
    }

    
  return (
    <div className="mt-5 p-pad-sm md:p-pad-md">
      <Row>
        <Col xs={24} sm={15}>
          <div className="flex rounded-md bg-[#e9d5d5] p-4 text-center">
            <div className="w-5 flex-auto">
            <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
            </div>
            <div className="w-64 flex-auto text-left flex">
            <div>Tất cả ({order.orderItems?.length} sản phẩm)</div>
            </div>
            <div className="w-32 flex-auto"></div>
            <div className="w-32 flex-auto">Đơn giá</div>
            <div className="w-32 flex-auto">Số Lượng</div>
            <div className="w-32 flex-auto">Thành tiền</div>
            <div className="w-20 flex-auto text-center cursor-pointer hover:text-[red]" onClick={handleChangeDeleteCheckAll}>
            <DeleteOutlined style={{fontSize: '20px'}} />
            </div>
          </div>
          {order?.orderItems?.map((item) => {
            return (
                <div className="mt-2 flex bg-[#e9d5d5] p-4 text-center items-center">
                <div className="w-5 flex-auto">
                <Checkbox onChange={onChange} value={item?.product} checked={listChecked.includes(item?.product)}></Checkbox>
                </div>
            <div className="flex w-64 flex-auto text-left items-center">
              <div>
                <img src={item?.image} className="h-[70px] w-[70px]" />
              </div>
              <div className="ml-1">{item?.name}</div>
            </div>
            <div className="w-32 flex-auto">
              <div className="text-left " style={{ display: item.category ? 'block' : 'none' }}>
                <div>Phân Loại hàng</div>
                <div>{item.category}</div>
              </div>
            </div>
            <div className="w-32 flex-auto">{convertPrice(item?.price)}</div> 
            <div className="w-32 flex-auto flex" style={{justifyContent:'center'}}>
            <button style={{ border:'1px solid #000',background: '#fff', cursor: 'pointer',borderRadius: '5px 0 0 5px', padding: '0 5px' }}
              onClick={() => handleChangeCount('decrease',item?.product, item?.amount === 1)}
             >
                        <MinusOutlined style={{ color: '#000', fontSize: '15px' }} />
                    </button>
                    <input style={{border:'1px solid #000', textAlign:'center'}} defaultValue={item?.amount} value={item?.amount} size="small" min={1} max={100} className="w-[30px] h-[30px]" />
                    <button style={{ border:'1px solid #000',background: '#fff', cursor: 'pointer',borderRadius: '0 5px 5px 0',padding: '0 5px' }}
                    onClick={() => handleChangeCount('increase',item?.product ,item?.amount === item.countInstock, item?.amount === 1)}
                     >
                        <PlusOutlined style={{ color: '#000', fontSize: '15px' }}/>
                    </button>
            </div>
            <div className="w-32 flex-auto">{convertPrice(item?.price * item?.amount)}</div>
            <div className="w-20 flex-auto cursor-pointer" onClick={() => handleDeteteOrder(item?.product)}><DeleteOutlined className="hover:text-[red]" style={{fontSize: '20px'}} /></div>
          </div>
            )
          })}
        </Col>
        <Col xs={24} sm={8}>
          <div className="mt-3 md:mt-0 ml-0 md:ml-2 h-auto w-full rounded-md bg-[#e9d5d5] p-2 md:p-4 " >
            <div className="flex justify-between">
                <div>Tạm tính</div>
                <div>{convertPrice(priceMemo)}</div>
            </div>
            <div className="flex justify-between">
                <div>Giảm giá</div>
                <div>{`${priceDiscountMemo } %`}</div>
            </div>
            <div className="flex justify-between">
                <div>Phí giao hàng</div>
                <div>{convertPrice(diliveryPriceMemo)}</div>
            </div>

            <div className=" flex  justify-between w-full">
                <div className="mt-4 ">Tổng tiền: <span className="text-[20px] md:hidden text-[#f55050]">{convertPrice(totalPriceMemo)}</span> </div>
                <div className="flex-1">
                    <div className=" md:text-[30px] text-[#f55050] hidden md:block text-right ">{convertPrice(totalPriceMemo)}</div>
                    <div className="hidden md:block text-right">(Đã bao gồm VAT nếu có)</div>
                </div>
            <ButtonComponent
            textButton='Mua hàng'
            className='md:hidden'
            disabled={!order?.orderItemsSlected?.length }
            styleButton={{
              background:!order?.orderItemsSlected?.length ? "#ccc" : "rgb(255, 57,69)",
              height: "40px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              marginTop: '10px',

            }}
            onClick={handleAddCard}
            ></ButtonComponent>
            </div>
          </div>

          <div className="mt-2 text-center hidden md:block">
            <ButtonComponent
            disabled={!order?.orderItemsSlected?.length }
            textButton='Mua hàng' 
            styleButton={{
              background:!order?.orderItemsSlected?.length ? "#ccc" : "rgb(255, 57,69)",
              height: "40px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              marginTop: '2px',
              marginLeft: '10px'
            }}
            onClick={handleAddCard}
            ></ButtonComponent>
          </div>
        

        </Col>
      </Row>
      {/* <ModalComponent  isOpen={isModalUpdateInfo}
      //  onOk={} 
      onCancel={() => setIsOpenModalUpdateInfo(false)}
       >
        
      </ModalComponent> */}
      <ModalComponentLogin isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}/>
    </div>
  );
}
