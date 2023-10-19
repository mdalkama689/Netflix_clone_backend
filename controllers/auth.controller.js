import sendEmail from '../utils/SendEmail.js';
import speakeasy from 'speakeasy'
import OTP from '../models/otp.models.js';


const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please enter the email'
      })
    }
    // Generate a secret key
    const secret = speakeasy.generateSecret({ length: 20 })
    console.log(typeof + 'secret')
    console.log(` secretbash : ${secret.base32}`)
    console.log(secret  + 'JSON.stringify(secret)')
    // Generate OTP using the secret
    const otp = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
      step: '300',
      digits: 5
    })
    console.log(`otp: ${otp}`);
    const otpExpiry = Date.now() + 10 * 60 * 1000  // 10 minutes validity
   console.log(`date : ${Date.now()} and otp expiry: ${otpExpiry}`);
    sendEmail(email, otp)
    // Create OTP entry in MongoDB
    const otpDocument = await new OTP({
      email: email,
      otp: otp,
      otpExpiry: otpExpiry,
      otpSecret: secret.base32
    })
    otpDocument.save()
    res.status(200).json({
      success: true,
      message: 'OTP send successfully'
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to send OTP'
    })
  }
}
// VERIFY OTP
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body
    const otpDocument = await OTP.findOne({ email })
    if (!otpDocument) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP ors OTP has expired',
      });
    }
    // Verify OTP using the stored secret
    const isValid = speakeasy.totp.verify({
      secret: otpDocument.otpSecret, // Use the stored secret for verification
      encoding: 'base32',
      token: otp,
    })

    if (isValid && otpDocument.otpExpiry > Date.now()) {
      return res.status(200).json({
        success: true,
        message: 'OTP verification successful',
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP or OTP has expired',
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
// REGISTER USER
const registerUser = async (req, res, next) => {
  try {

  } catch (error) {

  }
}
// LOGIN USER
const loginUser = async (req, res, next) => {
  try {

  } catch (error) {

  }
}


export {
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser
}