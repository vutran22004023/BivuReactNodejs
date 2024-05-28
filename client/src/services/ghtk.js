
import axios from 'axios'
const shippingfeecharged = async (
  address,
  province,
  district,
  pick_province,
  pick_district,
  value
) => {
    
    const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipment/fee`, {
        params: {
          address: address,
          province: province,
          district: district,
          pick_province: pick_province,
          pick_district: pick_district,
          weight: 1000,
          value: value,
          // deliver_option: "xteam",
        },
      });
  return response.data;
};

export default {
  shippingfeecharged,
};
