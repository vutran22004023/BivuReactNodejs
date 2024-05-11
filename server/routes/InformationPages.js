import  express  from "express";
import {informationPageController} from '../controllers/index.js'
import {authMiddleware} from '../Middlewares/index.js';
const router = express.Router();

router.post("/create-information-page", informationPageController.createInforPage)
router.get("/get-information-page-detail/:id", informationPageController.getInforPage)
router.put("/update-information-page/:id", informationPageController.updateInforPage)
export default router