import { UserModel } from "../model/index.js";
import bcrypt from "bcrypt";
import {Jwtservicres}  from './index.js'


function generateRandomPassword(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomPassword = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomPassword += charset[randomIndex];
  }
  return randomPassword;
}

const loginUserGoogle = async (data) => {
  try {
    const { displayName, email, photoURL } = data;
    const password = generateRandomPassword(15);
    const checkUser = await UserModel.findOne({ email: email });

    if (checkUser) {
      const access_Token = await Jwtservicres.generateAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_Token = await Jwtservicres.generateRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      return {
        status: 200,
        message: 'Đăng nhập thành công',
        id: checkUser._id,
        access_Token,
        refresh_Token,
      };
    } else {
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
      const createdUser = await UserModel.create({
        name: displayName,
        email,
        password: hashedPassword,
        isAdmin: false,
        avatar: photoURL,
      });

      if (createdUser) {
        return {
          status: 200,
          message: 'Đăng ký thành công',
          data: {
            ...createdUser._doc,
            password: 'not password',
          },
        };
      } else {
        throw new Error('Error creating user');
      }
    }
  } catch (err) {
    console.error('Error creating user:', err);
    throw new Error('Tạo người dùng thất bại.');
  }
};
const creactUsers = async (newUser) => {
  const { name, email, password, confirmPassword, phone } = newUser;

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const checkUser = await UserModel.findOne({
      email: email,
    });
    if (checkUser !== null) {
      return {
        status: "ERR",
        message: "Tài Khoản đã tồn tại",
      };
    }
    const createdUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      confirmPassword,
      phone,
    });

    if (createdUser) {
      return {
        status: 200,
        message: "Đăng ký thành công",
        data: {
          ...createdUser._doc,
          password: "not password",
        },
      };
    } else {
      throw new Error("Tạo người dùng thất bại.");
    }
  } catch (error) {
    throw error;
  }
};


const loginUser = async (newUser) => {
  const { email, password } = newUser;

  try {
  
    const checkUser = await UserModel.findOne({
      email: email,
    });
    if (checkUser === null) {
      return {
          status: "ERR",
          message: "Tài khoản không tồn tại",
      };
    }
    const comparePasswords = bcrypt.compareSync(password,checkUser.password)

    if(!comparePasswords) {
      return {
        status: "ERR",
        message: "Mật khẩu không đúng"
      }
    }
    if(checkUser) {
      const access_Token =await Jwtservicres.generateAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin
      })
      const refresh_Token = await Jwtservicres.generateRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin
      })
      return {
        status: 200,
        message: "Đăng nhập thành công",
        id: checkUser._id,
        access_Token,
        refresh_Token
      };
    }
   else {
      throw new Error("Đăng nhập không thành công");
    }
  } catch (error) {
    throw error;
  }
};


const updateUser = async (id, data) => {

  try {

    const checkUser = await UserModel.findOne({
      _id: id,
    });
    if(!checkUser) {
      return {
        status: "ERR",
        message: "Id không tồn tại",
      };
    }
    const updateUser = await UserModel.findByIdAndUpdate(id, data,{ new: true } )
    return {
      status: 200,
      message: "Cập nhật người dùng thành công",
      data: {
        ...updateUser._doc,
        password: 'Not password'
      }

    };
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {

  try {

    const checkUser = await UserModel.findOne({
      _id: id,
    });
    if(!checkUser) {
      return {
        status: "ERR",
        message: "Id không tồn tại",
      };
    }
     await UserModel.findByIdAndDelete(id, { new: true} )
    return {
      status: 200,
      message: "Xóa người dùng thành công",
    };
  } catch (error) {
    throw error;
  }
};


const getAllUser = async (limit = 10, page =0) => {

  try {
    const totalUser = await UserModel.countDocuments()
    const allUser = await UserModel.find().limit(limit).skip(page * limit)
    return {
      status: "ERR",
      message: "Xem tất cả người dùng",
      data: {
        allUser,
        password: 'Not password'
      },
      total: totalUser,
      pageCurrent: Number(page + 1),
      totalPage: Math.ceil(totalUser / limit)
    };
  } catch (error) {
    throw error;
  }
};


const getDetailsUser = async (id) => {

  try {

    const checkUser = await UserModel.findOne({
      _id: id,
    });
    if(!checkUser) {
      return {
        status: "ERR",
        message: "Id không tồn tại",
      };
    }
    return {
      status: 200,
      message: `Show thông tin của id: ${checkUser.id}`,
      data: {
        ...checkUser._doc,
      }
    };
  } catch (error) {
    throw error;
  }
};





const deleteUserMany = async(ids) => {
  try {

    await UserModel.deleteMany({_id: ids})
    return {
      status: 200,
      message: `Xóa thành công`,
    };
  } catch (error) {
    throw error;
  }
}



export default {
  creactUsers,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  deleteUserMany,
  loginUserGoogle
};
