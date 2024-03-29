import  express  from "express";
import {productController} from '../controllers/index.js';
import {authMiddleware} from '../Middlewares/index.js';
const router = express.Router();

router.get('/all-products',productController.getAllProduct)
router.get('/detail-product/:id',productController.getDetailProduct)
router.post('/create-product',authMiddleware.auth,productController.createProduct)
router.put('/update-product/:id',authMiddleware.auth,productController.updateProduct)
router.delete('/delete-product/:id',authMiddleware.auth,productController.deleteProduct)
export default router