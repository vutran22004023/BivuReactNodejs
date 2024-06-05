import axios from 'axios'

const apiGetAllCity= async () => {
    const res = await axios.get(`https://vapi.vnappmob.com/api/province/`)
    return res.data
}
const apiGetAllCity1 = async () => {
    const res = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json', {
        responseType: "application/json", 
    })
    return res
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