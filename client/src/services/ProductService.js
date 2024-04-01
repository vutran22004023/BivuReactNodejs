import axios from 'axios'

const createProduct = async (data, access_Token,) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/product/create-product`,data,{
        headers: {
            token: `Beare ${access_Token}`,
        }
    })
    return res.data
}

const getAllProduct = async () => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/product/all-products`)
    return res.data
}


export default {
    createProduct,
    getAllProduct
}