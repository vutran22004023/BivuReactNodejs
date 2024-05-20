import { DisCountModel } from "../model/index.js";

const createDiscount = async (newdiscount) => {
  const {
    name,
    discountPercent,
    startDate,
    endDate,
    discountAmount,
    status,
    quantity,
    description,
  } = newdiscount;
  try {
    const checkDiscount = await DisCountModel.findOne({
      name: name,
    });
    if (checkDiscount !== null) {
      return {
        status: "ERR",
        message: "Sản phẩm này đã tồn tại",
      };
    }

    const createDiscount= await DisCountModel.create({
      name,
      discountPercent,
      startDate,
      endDate,
      discountAmount,
      status,
      quantity,
      description,
    });
    if (createDiscount) {
      return {
        status: 200,
        message: "Thêm giảm giá thành công",
        data: {
          ...createDiscount._doc,
        },
      };
    }
  } catch (e) {
    console.log(e);
  }
};


const getAllDiscount = async () => {
  try { 
    const allDiscount = await DisCountModel.find()
    return {
      status: 200,
      message: "Xem tất cả discount",
      data: allDiscount,
  };

  }catch (e) {
    console.log(e)
  }
}

const getDiscountDetail = async (id) => {
  try {

    const checkDiscount = await DisCountModel.findOne({
      _id: id,
    });
    if(!checkDiscount) {
      return {
        status: "ERR",
        message: "Id không tồn tại",
      };
    }
    return {
      status: 200,
      message: `Show thông tin của id: ${checkDiscount.id}`,
      data: {
        ...checkDiscount._doc,
      }
    };
  } catch (error) {
    throw error;
  }
}

const updateDiscount = async(id, data) => {
  try {
    const checkDiscount = await DisCountModel.findOne({
      _id: id,
    });
    if(!checkDiscount) {
      return {
        status: "ERR",
        message: "Id không tồn tại",
      };
    }
    const updateDiscount = await DisCountModel.findByIdAndUpdate(id, data,{ new: true })
    return {
      status: 200,
      message: `Cập nhập thành công id : ${updateDiscount._id}`,
      data: {
        ...updateDiscount._doc,
      }

    };
  } catch (error) {
    throw error;
  }
}

const deleteDiscount = async(id) => {
  try {
    const checkDiscount = await DisCountModel.findOne({
      _id: id,
    });
    if(!checkDiscount) {
      return {
        status: "ERR",
        message: "Id không tồn tại",
      };
    }
    const updateDiscount = await DisCountModel.findByIdAndDelete(id, { new: true})
    return {
      status: 200,
      message: `Xóa thành công id : ${updateDiscount._id}`,
    };
  } catch (error) {
    throw error;
  }
}

export default {
  createDiscount,
  getAllDiscount,
  getDiscountDetail,
  updateDiscount,
  deleteDiscount
};
