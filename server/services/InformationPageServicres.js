import {InformationPageRouter} from '../model/index.js'
const createInforPage = async(newPage) => {
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
      } = newPage;

      try {
        const createInfor = await InformationPageRouter.create({
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
        })
        if(createInfor) {
            return {
                status: 200,
                message: "Thêm thông tin thanh công",
                data: {
                  ...createInfor._doc,
                },
        }
    }}catch(e) {
        console.log(e)
    }
}

const getInforPageDetail = async(id) => {
    try {
        const checkInfor = await InformationPageRouter.findOne({
          _id: id,
        });
        if(!checkInfor) {
          return {
            status: "ERR",
            message: "Id không tồn tại",
          };
        }
        return {
          status: 200,
          message: `Show thông tin của id: ${checkInfor.id}`,
          data: {
            ...checkInfor._doc,
          }
        };
      } catch (error) {
        throw error;
      }
}

const updateInforPage = async(id, data) => {
    try {
        const checkInfor = await InformationPageRouter.findOne({
          _id: id,
        });
        if(!checkInfor) {
          return {
            status: "ERR",
            message: "Id không tồn tại",
          };
        }
        const updateInfor = await InformationPageRouter.findByIdAndUpdate(id, data,{ new: true })
        return {
          status: 200,
          message: `Cập nhập thành công id : ${updateInfor._id}`,
          data: {
            ...updateInfor._doc,
          }
    
        };
      } catch (error) {
        throw error;
      }
}

export default {
    createInforPage,
    getInforPageDetail,
    updateInforPage
}