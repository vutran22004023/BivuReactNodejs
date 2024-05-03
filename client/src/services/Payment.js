import axios from 'axios'

const createPaymentLink= async () => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL_PAY}/create-payment-link`)
    return res.data
}

const createPaymentZaloPay= async () => {
    // const res = await axios.post(`${import.meta.env.REACT_APP_API_URL_PAY}/create-payment-link`)
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL_PAY}/payment-zalopay`)
    return res.data
}


export default {
    createPaymentLink,
    createPaymentZaloPay
}