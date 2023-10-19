import { Router } from 'express'
import { sendOtp, registerUser, loginUser, verifyOtp } from '../controllers/auth.controller.js'

const router = Router()
router.post('/send/otp', sendOtp)
router.post('/verify/otp', verifyOtp)
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router