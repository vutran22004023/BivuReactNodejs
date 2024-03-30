import express  from 'express';
import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
import {userRouters,productRouters} from './routes/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3001

//Router
app.use('/api/user', userRouters);
app.use('/api/product',productRouters)

const url =  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wu6bakk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
app.listen(port,async()=> {
    await mongoose.connect(url)
    .then(() => {
        console.log('Connect DB successfully')
    })
    .catch(err => {
        console.log(err)
    })
    console.log('listening on port http://localhost:'+port)
});