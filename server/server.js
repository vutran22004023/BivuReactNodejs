import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { userRouters, productRouters, orderRouters,informationPageRouters } from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {payMentController} from './controllers/index.js'
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
app.use("/api/informations-pages",informationPageRouters)
// api thanh toán
//begin api thanh toán PayOS
app.post("/api/create-payment-link",payMentController.createLinkPayOs);

app.post("/receive-hook",payMentController.receiveHookPayOs);

app.get("/get-payment-infomations/:idorder",payMentController.getPaymentInfomationsPayOs)

app.post("/cancel-payment-link/:idorder", payMentController.canceledPaymentLinkPayOs)

app.post("/confirm-webhook-payos", payMentController.confirmWebhookPayOs)
//end api thanh toán PayOS

app.post("/payment-zalopay",payMentController.createPaymentZaloPay);
// api callback zalo
app.post("/callback-zalo",payMentController.callbackZaloPay);

app.post("/order-status-zalopay/:apptransid",payMentController.orderStatusZaloPay);

app.post ("/transaction-refund", payMentController.transactionRefund);

app.post ("/transaction-refund-status", payMentController.transactionRefundStatus);
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