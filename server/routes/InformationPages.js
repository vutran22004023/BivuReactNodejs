import  express  from "express";
import {informationPageController} from '../controllers/index.js'
import {authMiddleware} from '../Middlewares/index.js';
const router = express.Router();

router.post("/create-information-page", informationPageController.createInforPage)
export default router