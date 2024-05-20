import  express  from "express";
import {discountController} from '../controllers/index.js'
const router = express.Router();

router.post("/create-discount", discountController.createDiscount)
router.get("/get-all-discounts", discountController.getAllDiscounts)
router.get("/get-discount-detail/:id", discountController.getDiscountDetail)
router.put("/update-discount/:id", discountController.updateDiscount)
router.delete("/delete-discount/:id", discountController.deleteDiscount)
;export default router