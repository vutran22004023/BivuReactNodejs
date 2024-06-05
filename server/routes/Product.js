import  express  from "express";
import {productController} from '../controllers/index.js';
import {authMiddleware} from '../Middlewares/index.js';
const router = express.Router();

router.get('/all-products',productController.getAllProduct)
router.get('/detail-product/:id',productController.getDetailProduct)
router.post('/create-product',authMiddleware.auth,productController.createProduct)
router.put('/update-product/:id',authMiddleware.auth,productController.updateProduct)
router.delete('/delete-product/:id',authMiddleware.auth,productController.deleteProduct)
router.post('/delete-many-product', authMiddleware.auth,productController.deleteManyProduct)
router.get('/get-all-type',productController.getAlltypeProduct)
router.get('/color',productController.getColor)
router.get('/color/detail/:id',productController.getColorDetail)
router.get('/all-products-dealsoc',productController.getAllProductsdealsoc)
export default router