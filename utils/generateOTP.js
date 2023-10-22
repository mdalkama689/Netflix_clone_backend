function generateOTP() {
  // Generate a random 5-digit string
  const otp = Math.floor(10000 + Math.random() * 90000);
  return otp.toString();
}

export default generateOTP;
