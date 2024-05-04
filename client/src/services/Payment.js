import axios from 'axios'

const createPaymentLink= async (data) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL_PAY}/api/create-payment-link`,data)
    return res.data
}

const createPaymentZaloPay= async (data) => {
    // const res = await axios.post(`${import.meta.env.REACT_APP_API_URL_PAY}/create-payment-link`)
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL_PAY}/payment-zalopay`,data)
    return res.data
}


export default {
    createPaymentLink,
    createPaymentZaloPay
}