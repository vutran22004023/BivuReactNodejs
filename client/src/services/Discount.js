import axios from 'axios'


const getAllDiscount= async () => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/discount/get-all-discounts`
    // , 
    // {
    //     headers: {
    //         token: `Bearer ${access_Token}`,
    //     }
    // }
)
    return res.data
}

const getDetailDiscount= async (id) => {
    console.log(id)
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/discount/get-discount-detail/${id}`
    // , 
    // {
    //     headers: {
    //         token: `Bearer ${access_Token}`,
    //     }
    // }
)
    return res.data
}

const createDiscount= async (data) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/discount/create-discount`, data
    // , 
    // {
    //     headers: {
    //         token: `Bearer ${access_Token}`,
    //     }
    // }
)
    return res.data
}


const updateDiscount= async (id, data) => {
    const res = await axios.put(`${import.meta.env.REACT_APP_API_URL}/discount/update-discount/${id}`, data
    // , 
    // {
    //     headers: {
    //         token: `Bearer ${access_Token}`,
    //     }
    // }
)
    return res.data
}

const DeleteDiscount= async (id) => {
    console.log(id)
    const res = await axios.delete(`${import.meta.env.REACT_APP_API_URL}/discount/delete-discount/${id}`
    // , 
    // {
    //     headers: {
    //         token: `Bearer ${access_Token}`,
    //     }
    // }
)
    return res.data
}


export default {
    getAllDiscount,
    getDetailDiscount,
    updateDiscount,
    DeleteDiscount,
    createDiscount
}