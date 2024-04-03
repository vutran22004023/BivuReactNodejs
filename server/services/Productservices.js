import { ProductModel } from "../model/index.js";
const createProduct = async (newProduct) => {
        const {name,image,type,price,counInStock,rating,description} =  newProduct
        try {
            const checkProduct = await ProductModel.findOne({
                name: name,
            })
            if (checkProduct !== null) {
                return {
                  status: "ERR",
                  message: "Sản phẩm này đã tồn tại",
                };
              }

            const createProduct = await ProductModel.create({
                name,
                image,
                type,
                price,
                counInStock,
                rating,
                description
            })
            if(createProduct) {
                return {
                    status: 200,
                    message: "Thêm sản phẩm thành công",
                    data: {
                      ...createProduct._doc,
                    },
            }
        }}catch(e) {
            console.log(e)
        }
}

const updateProduct = async(id, data) => {
  
    try {
        const checkProduct = await ProductModel.findOne({
          _id: id,
        });
        if(!checkProduct) {
          return {
            status: "ERR",
            message: "Id không tồn tại",
          };
        }
        const updateProduct = await ProductModel.findByIdAndUpdate(id, data,{ new: true })
        return {
          status: 200,
          message: `Cập nhập thành công id : ${updateProduct._id}`,
          data: {
            ...updateProduct._doc,
          }
    
        };
      } catch (error) {
        throw error;
      }
}

const deleteProduct = async(id) => {
    try {

        const checkProduct = await ProductModel.findOne({
          _id: id,
        });
        if(!checkProduct) {
          return {
            status: "ERR",
            message: "Id không tồn tại",
          };
        }
        const updateProduct = await ProductModel.findByIdAndDelete(id, { new: true})
        return {
          status: 200,
          message: `Xóa thành công id : ${updateProduct._id}`,
        };
      } catch (error) {
        throw error;
      }
}

const getAllProduct = async(limit = 10, page =0,sort ,filter) => {
    try {
        const totalProduct = await ProductModel.countDocuments()
        if (sort) {
          const sortObject = {};
          sortObject[sort[1]] = sort[0];
          console.log(sortObject);

          const allProductSort = await ProductModel.find().limit(limit).skip(page * limit).sort(sortObject)
          return {
              status: 200,
              message: "Xem tất cả sản phẩm",
              data: allProductSort,
              total: totalProduct,
              pageCurrent: Number(page) + 1,
              totalPage: Math.ceil(totalProduct / limit)
          };
          
      }else if (filter) {
        const filterObject = {};
        filterObject[filter[0]] = {'$regex': filter[1]};
        const allProductfilter = await ProductModel.find(filterObject)
        return {
            status: 200,
            message: "Xem tất cả sản phẩm",
            data: allProductfilter,
            total: totalProduct,
            pageCurrent: Number(page) + 1,
            totalPage: Math.ceil(totalProduct / limit)
        };
      }else {
          const allProductSort = await ProductModel.find().limit(limit).skip(page * limit); // Default sort by name
          return {
              status: 200,
              message: "Xem tất cả sản phẩm",
              data: allProductSort,
              total: totalProduct,
              pageCurrent: Number(page) + 1,
              totalPage: Math.ceil(totalProduct / limit)
          };
      }
      } catch (error) {
        throw error;
      }
}

const getDetailProduct = async(id) => {
    try {

        const checkProduct = await ProductModel.findOne({
          _id: id,
        });
        if(!checkProduct) {
          return {
            status: "ERR",
            message: "Id không tồn tại",
          };
        }
        return {
          status: 200,
          message: `Show thông tin của id: ${checkProduct.id}`,
          data: {
            ...checkProduct._doc,
            password: 'Not password'
          }
        };
      } catch (error) {
        throw error;
      }
}

export default {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct,
}