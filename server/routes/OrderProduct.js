import  express  from "express";
import {orderProductController} from '../controllers/index.js'
import {authMiddleware} from '../Middlewares/index.js';
const router = express.Router();

router.post('/create-order',authMiddleware.authUser,orderProductController.createOrderProduct)
router.get('/get-order-detail/:id',orderProductController.getOrderDetail)
export default router