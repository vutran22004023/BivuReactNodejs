import axios from 'axios'



//PayOs
const createPaymentLink= async (data) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL_PAY}/api/create-payment-link`,data)
    return res.data
}

const CheckOrderProductPayOs = async (id) => {
    const res = await axios.get(`${import.meta.env.REACT_APP_API_URL_PAY}/get-payment-infomations/${id}`)
    return res.data
}


//zalopay

const createPaymentZaloPay= async (data) => {
    // const res = await axios.post(`${import.meta.env.REACT_APP_API_URL_PAY}/create-payment-link`)
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL_PAY}/payment-zalopay`,data)
    return res.data
}

const orderStatusZaloPay = async (apptransid) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL_PAY}/order-status-zalopay/${apptransid}`)
    return res.data
}


export default {
    createPaymentLink,
    createPaymentZaloPay,
    orderStatusZaloPay,
    CheckOrderProductPayOs
}