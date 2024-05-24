import { ProductModel,ReviewModel } from "../model/index.js";
const createReviewProduct = async(newreview) => {
    const {productId,userId,product,userName,rating,comments,avatar} = newreview;
    try{
        const checkProduct = await ProductModel.findOne({
            _id: productId,
        })
        if (checkProduct === null) {
            return {
              status: "ERR",
              message: "Sản phẩm này ko tồn tại",
            };
          }
          const createReview = await ReviewModel.create({
            productId,
            userId,
            product: [
                {
                    name: product[0].name,
                    size: product[0].size,
                    color: product[0].color,
                }
            ],
            avatar,
            userName,
            rating,
            comments,
          })
          if(createReview) {
            return {
                status: 200,
                message: "Thêm review thành công",
                data: {
                  ...createReview._doc,
                },
        }
          }
    }catch(e) {
        console.log(e)
    }
}
const updateReviewProduct = async(id,iduser,data) => {
  const checkReview = await ReviewModel.findOne({
    _id: id,
    userId: iduser
  });

  if(!checkReview) {
    return {
      status: "ERR",
      message: "Id không tồn tại",
    };
  }
  const updateReview = await ReviewModel.findByIdAndUpdate(id, data,{ new: true })
        return {
          status: 200,
          message: `Cập nhập thành công id : ${updateReview._id}`,
          data: {
            ...updateReview._doc,
          }
    
        };
}

const getReviewProduct = async(productId) => {
  try {
    const checkProductReview = await ReviewModel.find({
      productId: productId,
    });
    if(!checkProductReview) {
      return {
        status: "ERR",
        message: "Id không tồn tại",
      };
    }
    return {
      status: 200,
      message: `Show thông tin của id: `,
      data: checkProductReview.map(review => ({ ...review._doc }))
    };
  } catch (error) {
    throw error;
  }
}

export default {
    createReviewProduct,
    updateReviewProduct,
    getReviewProduct
}

