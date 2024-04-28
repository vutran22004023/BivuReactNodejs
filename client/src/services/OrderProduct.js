import axios from 'axios'

const createOrderProduct= async (access_Token, data) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/order-product/create-order`, data, {
        headers: {
            token: `Bearer ${access_Token}`,
        }
    })
    return res.data
}

export default {
    createOrderProduct
}