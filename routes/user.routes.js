import { Router } from 'express'
import { sendOtp, verifyOtp, registerUser, loginUser, logoutUser } from '../controllers/auth.controller.js'
import { updateUserDetails, userDeleted, getUser, getAllUsers } from '../controllers/user.controller.js'
import { isLoggedIn } from '../middlewares/auth.middleware.js'

const router = Router()
router.post('/send/otp', sendOtp)
router.post('/verify/otp', verifyOtp)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
 router.put('/update/:id', isLoggedIn, updateUserDetails)
 router.delete('/delete/:id', isLoggedIn, userDeleted)
 router.get('/get/:id', getUser)
 router.get('/get/all', isLoggedIn, getAllUsers)
export default router