import axios from 'axios'

const apiGetAllCity= async () => {
    const res = await axios.get(`https://vapi.vnappmob.com/api/province/`)
    return res.data
}

const apiDetailAllDistrict= async (province_id) => {
    const res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${province_id}`)
    return res.data
}

const apiGetDetaiAllRard= async (district_id) => {
    const res = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${district_id}`)
    return res.data
}

export default {
    apiGetAllCity,
    apiDetailAllDistrict,
    apiGetDetaiAllRard
}