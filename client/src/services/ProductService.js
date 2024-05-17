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
    return res.data
}

const getDetailProduct= async (id) => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/product/detail-product/${id}`)
    return res.data
}

const getAllProduct = async (limit,search,page) => {
    if(search.length > 0) {
        const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/product/all-products?filter=name&filter=${search}`)
        return res.data

    }else {
        const res =await axios.get(`${import.meta.env.REACT_APP_API_URL}/product/all-products?limit=${limit}&page=${page}`)
        return res.data
    }
}
const getAllTypeProduct= async () => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/product/get-all-type`)
    return res.data
}

const getProductType= async (type,page,limit) => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/product/all-products?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
}

const getAllColor= async () => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/product/color`)
    return res.data
}


const getDetailColor = async(id) => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/product/color/detail/${id}`)
    return res.data
}




export default {
    createProduct,
    getAllProduct,
    updatedDetailProduct,
    getDetailProduct,
    DeleteDetailProduct,
    DeleteManyProduct,
    getAllTypeProduct,
    getProductType,
    getAllColor,
    getDetailColor
}