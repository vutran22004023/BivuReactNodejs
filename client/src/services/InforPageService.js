import axios from 'axios'

const createInforPage= async ( data,access_Token) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/informations-pages/create-information-page`, data
    , 
    {
        headers: {
            token: `Bearer ${access_Token}`,
        }
    }
)
    return res.data
}

const getAllInforPage= async () => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/informations-pages/get-all-information-pages`)
    return res.data
}



const getDetailInforPage= async (id,access_Token) => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/informations-pages/get-information-page-detail/${id}`
    , 
    {
        headers: {
            token: `Bearer ${access_Token}`,
        }
    }
)
    return res.data
}

const updateInforPage= async (id,data,access_Token) => {
    const res = await axios.put(`${import.meta.env.REACT_APP_API_URL}/informations-pages/update-information-page/${id}`,data
    , 
    {
        headers: {
            token: `Bearer ${access_Token}`,
        }
    }
)
    return res.data
}

export default {
    createInforPage,
    getDetailInforPage,
    updateInforPage,
    getAllInforPage
}