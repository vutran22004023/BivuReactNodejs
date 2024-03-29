import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()

const generateAccessToken  = async (payload) => {
    try {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '7d' });
        return accessToken;
    } catch (error) {
        throw error;
    }
}

const generateRefreshToken  = async (payload) => {
    try {
        const accessToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
        return accessToken;
    } catch (error) {
        throw error;
    }
}

const refreshTokenServices  = async (token, id) => {
    try {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    reject({
                        status: 'ERR',
                        message: "Token bị hết hạn",
                    });
                    
                }
                if(id === '6600ff60e6d510f9bda88add') {
                    const access_token = await generateAccessToken({
                        _id: id,
                        isAdmin: true,
                    });
                    resolve({
                        status: 'Ok',
                        message: 'Success',
                    });
                }else {
                    const access_token = await generateAccessToken({
                        _id: id,
                        isAdmin: false,
                    });
                    resolve({
                        status: 'Ok',
                        message: 'Success',
                    });
                }
            });
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        throw error;
    }
};



export default {
    generateAccessToken,
    generateRefreshToken,
    refreshTokenServices
} 
