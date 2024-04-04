import axios from 'axios'
const axiosJWT = axios.create()
const createProduct = async (data, access_Token) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/product/create-product`,data,{
        headers: {
            token: `Beare ${access_Token}`,
        }
    })
    return res.data
}

const updatedDetailProduct= async (id,data,access_Token) => {
    const res = await axiosJWT.put(`${import.meta.env.REACT_APP_API_URL}/product/update-product/${id}`,data,{
        headers: {
            token: `Beare ${access_Token}`,
        }
    })
    return res.data
}

const DeleteDetailProduct= async (id,access_Token) => {
    const res = await axios.delete(`${import.meta.env.REACT_APP_API_URL}/product/delete-product/${id}`,{
        headers: {
            token: `Beare ${access_Token}`,
        }
    })
    return res.data
}

const DeleteManyProduct= async (id,access_Token) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/product/delete-many-product`,id,{
        headers: {
            token: `Beare ${access_Token}`,
        }
    })
    console.log(access_Token)
    return res.data
}

const getDetailProduct= async (id) => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/product/detail-product/${id}`)
    return res.data
}

const getAllProduct = async () => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/product/all-products`)
    return res.data
}


export default {
    createProduct,
    getAllProduct,
    updatedDetailProduct,
    getDetailProduct,
    DeleteDetailProduct,
    DeleteManyProduct
}