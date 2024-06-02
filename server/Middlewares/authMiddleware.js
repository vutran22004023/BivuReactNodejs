import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()

const auth = (req, res, next) => {

    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Token không đúng',
            })
        }
        if(user?.isAdmin === true) {
            next();
        }else {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không có quyền admin',
            })
        }
      });
}


const authUser = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id;
    const userisAdmin = req.headers.isadmin;
    jwt.verify(token, process.env.ACCESS_TOKEN,async function(err, user) {
        if(err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Hết hạn token',
            })
        }
        if(user?.isAdmin || user?.id === userId) {
            next();
        }else {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không có quyền admin 1',
            })
        }
      }
    );
}


export default {
    auth,
    authUser,
}