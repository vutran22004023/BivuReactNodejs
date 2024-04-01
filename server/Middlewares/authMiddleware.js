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
    const refreshToken = req.cookies.refresh_Token;

    jwt.verify(token, process.env.ACCESS_TOKEN,async function(err, user) {
        if(err) {
            let url = 'http://localhost:3001/api/user/refresh-token'
            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    authorization: refreshToken,
                    id: userId,
                    isadmin:userisAdmin,
                },
            });
                if(resp) {
                    next()
                }
        }
        if(user?.isAdmin || user?.id === userId) {
            next();
        }else {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không có quyền admin',
            })
        }
      });
}


export default {
    auth,
    authUser,
}