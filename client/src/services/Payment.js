import axios from 'axios'

const createPaymentLink= async () => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/create-payment-link`)
    return res.data
}
const createReceiveHook= async () => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/pay/receive-hook`)
    return res.data
}

export default {
    createPaymentLink,
    createReceiveHook
}