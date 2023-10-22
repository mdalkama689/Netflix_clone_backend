import bcrypt from "bcrypt";

async function encryptOTP(otp, saltRounds) {
  const hashedOTP = await bcrypt.hash(otp, saltRounds);
  return hashedOTP;
}

export default encryptOTP;
