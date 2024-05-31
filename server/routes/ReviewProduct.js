import  express  from "express";
import {reviewProductController} from '../controllers/index.js';
import {authMiddleware} from '../Middlewares/index.js';
const router = express.Router();

router.post('/create-review-product',authMiddleware.authUser,reviewProductController.createReviewProduct)
router.put('/update-review-product/:id/:iduser',authMiddleware.authUser,reviewProductController.updateReviewProduct)
router.get('/get-review-product/:productId', reviewProductController.getReviewProduct)
router.get('/get-review-product-all', reviewProductController.getReviewProductAll)
export default router