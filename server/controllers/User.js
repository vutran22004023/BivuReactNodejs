import {Userservices,Jwtservicres} from '../services/index.js'


const loginUserGoogle = async(req, res) => {
    try {
        const { displayName, email, photoURL } = req.body;
        if(!displayName|| !email || !photoURL) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Chưa điền đầy đủ thông tin'
            })
        }
        const response = await Userservices.loginUserGoogle(req.body);
        const { refresh_Token, ...newResponse } = response;
        if (refresh_Token) {
          res.cookie('refresh_Token', refresh_Token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
          });
        }
        return res.status(response.status).json(newResponse);
      } catch (e) {
        console.error('Error handling login with Google:', e);
        return res.status(500).json({
          message: 'Tạo người dùng thất bại.',
        });
      }
}    
const creactUser = async (req, res) => {
    try{
        const {name, email,password, confirmPassword,phone} = req.body
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = mailformat.test(email)
        if(!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Chưa điền đầy đủ thông tin'
            })
        }else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email nhập chưa đúng'
            })
        }else if(password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Nhập lại mật khẩu chưa đúng'
            })
        }
        const response = await Userservices.creactUsers(req.body)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}


const loginUser = async (req, res) => {
    try{
        const {email,password} = req.body
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = mailformat.test(email)
        if( !email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Chưa điền đầy đủ thông tin '
            })
        }else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email nhập chưa đúng'
            })
        }
        const response = await Userservices.loginUser(req.body)
        const {refresh_Token, ...newResponse} =response
        res.cookie('refresh_Token', refresh_Token, {
            httpOnly: true, // Corrected property name
            secure: false,
            samesite: 'strict'
        });
        return res.status(200).json(newResponse)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}


const updateUser =async (req, res) => {
    try{
        const userid = req.params.id
        const {email,name, phone, address, avatar, isAdmin,city,district,rard,nameCity,nameDistrict,nameRard,specific_address} = req.body
        if(!userid) {
            return res.status(200).json({
                status: 'ERR',
                message: 'id không tồn tại'
            })
        }
        const response = await Userservices.updateUser(userid,req.body)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser =async (req, res) => {
    try{
        const userid = req.params.id
        if(!userid) {
            return res.status(200).json({
                status: 'ERR',
                message: 'id không tồn tại'
            })
        }
        const response = await Userservices.deleteUser(userid)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const allUser =async (req, res) => {
    try{
        const {limit, page} = req.query
        const response = await Userservices.getAllUser(limit || 10, Number(page) || 0)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getDetailsUser =async (req, res) => {
    try{
        const userid = req.params.id
        const userisAdmin =req.params.isAdmin
        if(!userid) {
            return res.status(200).json({
                status: 'ERR',
                message: 'id không tồn tại'
            })
        }
        const response = await Userservices.getDetailsUser(userid)
        return res.status(200).json(response).end()
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const Idauth = req.headers.id;
      const isAdmin = req.headers.isadmin;
      if (!authHeader) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Token không tồn tại'
        });
      }
  
      const token = authHeader.split(' ')[1]; // Extract Bearer token
      const response = await Jwtservicres.refreshTokenServices(token, Idauth, isAdmin);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e.message
      });
    }
  };


const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_Token');
        return res.status(200).json({
        status: 200,
        message: 'Đăng xuất thành công'
    });
    }catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const deleteManyUser = async(req, res) => {
    try {
        const ids = req.body.id
        if(!ids) {
            return res.status(200).json({
                status: 'Err',
                message: 'id không tồn tại'
            })
        }
        const response = await Userservices.deleteUserMany(ids)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}





export default {
    creactUser,
    loginUser,
    updateUser,
    deleteUser,
    allUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
    deleteManyUser,
    loginUserGoogle
}