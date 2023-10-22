import { Schema, model } from "mongoose";
const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Number,
      default: Date.now() + 5 * 60 * 1000,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const OTP = model("otp", otpSchema);

export default OTP;
