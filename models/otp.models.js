import { Schema, model } from 'mongoose'
const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    otpExpiry: {
        type: Date,
        required: true
    },
    otpSecret: {
        type: String,
        required: true
    }
})
const OTP = model('otp', otpSchema)

export default OTP