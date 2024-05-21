import  express  from "express";
import {reviewProductController} from '../controllers/index.js';
const router = express.Router();

router.post('/create-review-product',reviewProductController.createReviewProduct)
router.put('/update-review-product/:id/:iduser',reviewProductController.updateReviewProduct)
router.get('/get-review-product/:productId', reviewProductController.getReviewProduct)
export default router