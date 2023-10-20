import sendEmail from '../utils/SendEmail.js';
import User from '../models/user.models.js'
import OTP from '../models/otp.models.js';
import cron from 'node-cron'
import encryptPassword from '../utils/encryptPassword.js';
import encryptOTP from '../utils/encryptOTP.js';
import bcrypt from 'bcrypt'

// Schedule the cleanup task to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try {
    // Calculate the timestamp for 5 minutes ago
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    // Delete all OTPs that have expired more than 5 minutes ago
    await OTP.deleteMany({ otpExpiry: { $lt: fiveMinutesAgo } });
    // "Cleaned up expired OTPs.
  } catch (error) {
console.log(error.message);
  }
})

// SEND OTP
const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body
    // check email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please enter the email'
      })
    }
    // check user exists or not
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already register'
      })
    }
    // delete their previous data
    const otpExists = await OTP.findOne({ email })
    if (otpExists) {
      await OTP.findOneAndDelete({ email })
    }
    // generate otp
    const otp = generateOTP()
    const saltRounds = 10; // Choose an appropriate number of salt rounds
const otpHash = await encryptOTP(otp, saltRounds); // Hash the OTP
    // otp expiry time
    const otpExpiry = Date.now() + 5 * 60 * 1000  // 5 minutes validity
    // send email
    sendEmail(email, otp)
    console.log(otp);
   // Create OTP entry in MongoDB
    const otpDocument = await new OTP({
     email,
     otp: otpHash,
      otpExpiry
    })
    // save in db
    await otpDocument.save()
    res.status(200).json({
      success: true,
      message: 'OTP send successfully'
    })
  } catch (error) {
    // if error occure
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
    // check email
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'All fields are mandatory'
      })
    }
    // if user send otp
    const user = await OTP.findOne({ email })
    // user user does not exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email does not exists'
      })
    }
    const otpMatch = await bcrypt.compare(otp, user.otp);
    // check all validation like expiry time, is used, how many time otp used
    if (otpMatch && user.otpExpiry >= Date.now() && !user.isUsed && user.usageCount < 3) {
      // delete all the details from db
      await OTP.findOneAndDelete({ email })
      return res.status(200).json({
        success: true,
        message: 'OTP verification successfully'
      })
    }
    else {
      // if user give incorrect otp. save for validation of after 5 minutes
      user.usageCount++
      await user.save()
      return res.status(400).json({
        success: false,
        message: 'Please enter correct OTP'
      })
    }

  } catch (error) {
    // give error
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// REGISTER USER
const registerUser = async (req, res, next) => {
  try {
const { email, password, username } = req.body 
if (!email || !password || !username) {
  return res.status(400).json({
    success: false,
    message: 'All fields is required'
  })
}
const userExistsWithUsername = await User.findOne({ username })
if (userExistsWithUsername) {
  return res.status(400).json({
    success: false,
    message: 'Username already registered'
  })
}
const userExistsWithEmail = await User.findOne({ email })
if (userExistsWithEmail) {
  return res.status(400).json({
    success: false,
    message: 'Email already registered'
  })
}
const saltRounds = 10
const encryptedPassword = await encryptPassword(password, saltRounds)
const user = await User.create({
  email,
  username,
  password: encryptedPassword
})
await user.save()
user.password = undefined
res.status(200).json({
  success: true,
  message: 'User registered successfully',
  user
})
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
// LOGIN USER
const loginUser = async (req, res, next) => {
  try {
const {email, password} = req.body 
if (!email || !password) {
  return res.status(200).json({
    success: false,
    message: 'All fields is required'
  })
}
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message
    })
  }
}


export {
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser
}