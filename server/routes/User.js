import  express  from "express";
import {userController} from '../controllers/index.js'
import {authMiddleware} from '../Middlewares/index.js';



const router = express.Router();
//login 
router.post('/sign-up', userController.creactUser)
router.post('/sign-in', userController.loginUser)
router.post('/log-out', userController.logoutUser)

//User
router.get('/all-user',authMiddleware.auth, userController.allUser)
router.get('/get-details/:id',authMiddleware.authUser, userController.getDetailsUser)
router.put('/update-user/:id',authMiddleware.authUser,userController.updateUser)
router.delete('/delete-user/:id',authMiddleware.auth, userController.deleteUser)
router.post('/refresh-token',userController.refreshToken)
router.post('/delete-many-user', authMiddleware.auth,userController.deleteManyUser)
export default router