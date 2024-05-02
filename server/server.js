import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { userRouters, productRouters, orderRouters } from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import PayOS from "@payos/node";
import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import bodyParser from "body-parser";
import qs from "qs";
// npm install moment
const app = express();
app.use(cors());
// app.use(express.static("public"))
app.use(express.json({ limit: "50mb" }));
app.use(express.json())
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Thêm extended: true ở đây
app.use(cookieParser());
const port = process.env.PORT || 3001;

//Router
app.use("/api/user", userRouters);
app.use("/api/product", productRouters);
app.use("/api/order-product", orderRouters);
// api thanh toán
//begin api thanh toán PayOS
const payos = new PayOS(
  `${process.env.CLIENT_ID}`,
  `${process.env.API_KEY}`,
  `${process.env.CHECKSUM_KEY}`
);
app.post("/create-payment-link", async (req, res) => {
  const order = {
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
        price: 28000000,
      },
    ],
    cancelUrl: "https://your-cancel-url.com",
    returnUrl: "https://your-success-url.com",
  };
  const paymentLinkData = await payos.createPaymentLink(order);
  res.redirect(303, paymentLinkData.checkoutUrl);
});

app.post("/receive-hook", async (req, res) => {
  console.log(req.body);
  res.json();
});
//end api thanh toán PayOS

// begin thanh toán ZaloPay API
const config = {
  app_id: "2554",
  key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
  key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};
app.post("/payment-zalopay", async (req, res) => {
    const embed_data = {
      redirecturl: "https://sb-openapi.zalopay.vn",
    };
  
    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: "user123",
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: 50000,
      description: `Lazada - Payment for the order #${transID}`,
      // bank_code: "zalopayapp",
      callback_url: 'https://5d21-2001-ee0-4b4c-e2e0-bcab-e65a-a22a-dc58.ngrok-free.app/callback-zalo'
    };
  
    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
  
    try {
      const result = await axios.post(config.endpoint, null, { params: order });
      return res.status(200).json(result.data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
// api callback zalo
app.post("/callback-zalo", (req, res) => {
  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
});

app.post("/order-status-zalopay/:app_trans_id", async (req, res) => {
    const app_trans_id = req.params.app_trans_id;
    let postData = {
        app_id: config.app_id,
        app_trans_id: app_trans_id, // Input your app_trans_id
    };
    
    let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    
    
    let postConfig = {
        method: 'post',
        url: config.endpoint,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(postData)
    };
    
    try {
        const result = await axios(postConfig);
        console.log(JSON.stringify(result.data)); // Log response data
        return res.status(200).json(result.data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }    
});

// end thanh toán ZaloPay API

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wu6bakk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
app.listen(port, async () => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("Connect DB successfully");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("listening on port http://localhost:" + port);
});
