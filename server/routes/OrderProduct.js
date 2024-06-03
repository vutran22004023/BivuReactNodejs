import  express  from "express";
import {orderProductController} from '../controllers/index.js'
import {authMiddleware} from '../Middlewares/index.js';
const router = express.Router();

router.post('/create-order',authMiddleware.authUser,orderProductController.createOrderProduct)
router.put('/update-order/:id',authMiddleware.authUser,orderProductController.updateOrderProduct )
router.get('/get-order-detail-user/:id',authMiddleware.authUser,orderProductController.getOrderDetail)
router.get('/get-order-detail-product/:id',authMiddleware.authUser,orderProductController.getOrderDetailProduct)
router.get('/get-all-order-products',authMiddleware.auth,orderProductController.getAllOrderProduct )
router.get('/get-all-order-product/date/:datestart/:datesend',orderProductController.getAllOrderProductDate)
export default router