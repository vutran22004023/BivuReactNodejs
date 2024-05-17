import axios from 'axios'

const getAllOrderProducts = async(access_Token) => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/order-product/get-all-order-products`, {
        headers: {
            token: `Bearer ${access_Token}`,
        }
    })
    return res.data
}
const createOrderProduct= async (access_Token, data) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/order-product/create-order`, data, {
        headers: {
            token: `Bearer ${access_Token}`,
        }
    })
    return res.data
}

const updateOrderProduct = async( id, data, access_Token) => {
    const res = await axios.put(`${import.meta.env.REACT_APP_API_URL}/order-product/update-order/${id}`,data,{
        headers: {
            token: `Beare ${access_Token}`,
        }
    })
    return res.data
}
const getDetailOrder= async (id,access_Token) => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/order-product/get-order-detail-user/${id}`,{
        headers: {
            token: `Beare ${access_Token}`,
        }
    })
    return res.data
}

const getDetailOrderProduct= async (id,access_Token) => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/order-product/get-order-detail-product/${id}`,{
        headers: {
            token: `Beare ${access_Token}`,
        }
    })
    return res.data
}


export default {
    createOrderProduct,
    getDetailOrder,
    getDetailOrderProduct,
    getAllOrderProducts,
    updateOrderProduct
}