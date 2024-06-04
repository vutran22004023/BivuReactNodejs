import  express  from "express";
import {orderProductController} from '../controllers/index.js'
import {authMiddleware} from '../Middlewares/index.js';
const router = express.Router();

router.post('/create-order',authMiddleware.authUser,orderProductController.createOrderProduct)
router.put('/update-order/:id',authMiddleware.authUser,orderProductController.updateOrderProduct )
router.get('/get-order-detail-user/:id',authMiddleware.authUser,orderProductController.getOrderDetail)
router.get('/get-order-detail-product/:id',authMiddleware.authUser,orderProductController.getOrderDetailProduct)
router.get('/get-all-order-products',authMiddleware.auth,orderProductController.getAllOrderProduct )
router.get('/get-all-order-product/date/:datestart/:datesend',authMiddleware.auth,orderProductController.getAllOrderProductDate)
router.get('/get-dashboard',authMiddleware.auth, orderProductController.getDashboard)
router.get('/get-order-product-isdelivered-false',authMiddleware.auth,orderProductController.getAllOrderProductIsdeliveredfalse )
export default router