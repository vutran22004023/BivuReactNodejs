import axios from 'axios'

const createReview= async (data,access_Token) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/reviews/create-review-product`, data, {
        headers: {
            token: `Bearer ${access_Token}`,
        }
    })
    return res.data
}

const getDetailReviewProduct= async (id) => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/reviews/get-review-product/${id}`)
    return res.data
}



export default{
    createReview,
    getDetailReviewProduct
}