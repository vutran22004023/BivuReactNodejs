import {InforPageServicres} from '../services/index.js'
const createInforPage = async (req, res) => {
  try {

    const {
      namePage,
      description,
      logo_1,
      logo_2,
      image_slider,
      image_right,
      image_bottom,
      title_1,
      title_2,
      title_3,
      title_4,
      link_fb,
      link_tt,
      link_shoppee,
      image_qc_1,
      image_qc_2,
      image_qc_3,
      image_qc_4,
      image_qc_5,
      link_qc_1,
      link_qc_2,
      link_qc_3,
      link_qc_4,
      link_qc_5,
    } = req.body;
    const response = await InforPageServicres.createInforPage(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getInforPage = async(req,res) => {
    try{
        const id = req.params.id
        if(!id) {
            return res.status(200).json({
                status: 'Err',
                message: 'id không tồn tại'
            })
        }
        const response = await InforPageServicres.getInforPageDetail(id)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateInforPage = async(req, res) => {
    try{
        const id = req.params.id
        const data = req.body
        if(!id) {
            return res.status(200).json({
                status: 'Err',
                message: 'id không tồn tại'
            })
        }
        const response = await InforPageServicres.updateInforPage(id,data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllInforPage = async(req, res) => {
  try{

    const response = await InforPageServicres.getAllInforPage()
    return res.status(200).json(response)
}catch(e) {
    return res.status(404).json({
        message: e
    })
}
}

export default {
  createInforPage,
  getInforPage,
  updateInforPage,
  getAllInforPage
};
