import React, { useState } from "react";
import { Col,Space, Divider, Row,InputNumber,Checkbox } from "antd";
import product1 from "../../../../assets/font-end/imgs/Product/product1.png";
import ButtonComponent from '../../../../components/ButtonSearch/Button'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {IncreaseAmount,DecreaseAmount,RemoveOrderProduct,removeAllOrderProduct} from "../../../../redux/Slides/orderProductSlide";

export default function CartProduct() {
    const[numberProduct, setNumberProduct] = useState(1)
    const [listChecked, setListChecked] = useState([])
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order);
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

    const handleDeteteOrder = (idProduct) => {
      dispatch(RemoveOrderProduct({idProduct}))
    }

    const onChange = (e) => {
      if(listChecked.includes(e.target.value)){
        const newListChecked = listChecked.filter((item) => item !== e.target.value)
        setListChecked(newListChecked)
      }else {
        setListChecked([...listChecked, e.target.value])
      }
    };

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

  return (
    <div className="mt-5 p-pad-sm md:p-pad-md">
      <Row>
        <Col xs={15} sm={15}>
          <div className="flex rounded-md bg-[#e9d5d5] p-4 text-center">
            <div className="w-5 flex-auto">
            <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
            </div>
            <div className="w-64 flex-auto text-left flex">
            <div>Tất cả ({order.orderItems?.length} sản phẩm)</div>
            </div>
            <div className="w-32 flex-auto">Đơn giá</div>
            <div className="w-32 flex-auto">Số Lượng</div>
            <div className="w-32 flex-auto">Thành tiền</div>
            <div className="w-20 flex-auto text-center">
            <DeleteOutlined style={{fontSize: '20px'}} onClick={handleChangeDeleteCheckAll} />
            </div>
          </div>
          {order.orderItems?.map((item) => {
            console.log(item);
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
            <div className="w-32 flex-auto">{item?.price} đ</div>
            <div className="w-32 flex-auto flex">
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
            <div className="w-32 flex-auto">312312312</div>
            <div className="w-20 flex-auto cursor-pointer" onClick={() => handleDeteteOrder(item?.product)}><DeleteOutlined style={{fontSize: '20px'}} /></div>
          </div>
            )
          })}
        </Col>
        <Col xs={8} sm={8}>
          <div className="ml-2 h-auto w-full rounded-md bg-[#e9d5d5] p-4" >
            <div className="flex justify-between">
                <div>Tạm tính</div>
                <div>0</div>
            </div>
            <div className="flex justify-between">
                <div>Giảm giá</div>
                <div>0</div>
            </div>
            <div className="flex justify-between">
                <div>Thuế</div>
                <div>0</div>
            </div>
            <div className="flex justify-between">
                <div>Phí giao hàng</div>
                <div>0</div>
            </div>

            <div className=" flex  justify-between">
                <div className="mt-4">Tổng tiền</div>
                <div>
                    <div className="text-[30px] text-[#f55050]">0213</div>
                    <div>(Đã bao gồm VAT nếu có)</div>
                </div>
            </div>
          </div>

          <div className="mt-2 text-center">
            <ButtonComponent
            textButton='Mua hàng' 
            styleButton={{
              background:'red',
              height: "40px",
              width: "300px",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              marginTop: '2px',
            }}
            ></ButtonComponent>
          </div>
        

        </Col>
      </Row>
    </div>
  );
}
