import axios from 'axios'
const axiosJWT = axios.create()
 const loginUser = async (data) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/user/sign-in`,data)
    return res.data
}

const RegistUser = async (data) => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/user/sign-up`,data)
    return res.data
}

const LogOutUser = async () => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/user/log-out`)
    return res.data
}

const getDetailUser = async (id,access_Token) => {
    const res = await axiosJWT.get(`${import.meta.env.REACT_APP_API_URL}/user/get-details/${id}`,{
        headers: {
            token: `Beare ${access_Token}`
        }

    })
    return res.data
}

const refreshToken = async () => {
    const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials: true,

    })
    return res.data
}

export default {
    loginUser,
    RegistUser,
    getDetailUser,
    refreshToken,
    axiosJWT,
    LogOutUser
}