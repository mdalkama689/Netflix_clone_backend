import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
  if (!token) {
    return res.status(200).json({
      success: false,
      message:
        "You must be logged in to access this feature. Please log in or create an account to continue.",
    });
  }
  const secretKey = process.env.SECRET_KEY;
  const userDetails = jwt.verify(token, secretKey);
  if (!userDetails) {
    return res.status(200).json({
      success: false,
      message:
        "Token verification failed. Please log in or create an account to continue.",
    });
  }
  console.log(userDetails);
  req.user = userDetails;
  next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
};

export { isLoggedIn };