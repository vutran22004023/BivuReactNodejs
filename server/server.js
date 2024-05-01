import express  from 'express';
import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
import {userRouters,productRouters,orderRouters} from './routes/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import PayOS from '@payos/node';
const payos = new PayOS('22101493-cad1-4d1a-a672-c0fc3fe6c64d', '0da57b75-5046-4b76-940f-5b533972e8f3','bb5cf2a85f6f291d76ea3f8570a9526350c9e7fde4e96a4c11bae49d88be82ef');
const app = express();
app.use(cors())
// app.use(express.static("public"))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb'})); // Thêm extended: true ở đây
app.use(cookieParser());
const port = process.env.PORT || 3001


//Router
app.use('/api/user', userRouters);
app.use('/api/product',productRouters)
app.use('/api/order-product',orderRouters)
app.post('/create-payment-link', async (req, res) => {
    const order  = {
        orderCode: 9876,
        amount: 5600000,
        description: "VQRIO123",
        buyerName: "Nguyen Van A",
        buyerEmail: "buyer-email@gmail.com",
        buyerPhone: "090xxxxxxx",
        buyerAddress: "số nhà, đường, phường, tỉnh hoặc thành phố",
        items: [
        {
        name: "Iphone",
        quantity: 2,
        price: 28000000
        }
        ],
        cancelUrl: "https://your-cancel-url.com",
        returnUrl: "https://your-success-url.com",
        }
    const paymentLinkData = await payos.createPaymentLink(order);
    res.redirect(303, paymentLinkData.checkoutUrl)
})

app.post('/receive-hook', async (req, res) => {
    console.log(req.body)
    res.json()
})


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