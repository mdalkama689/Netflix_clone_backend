import User from "../models/user.models.js";
import encryptPassword from "../utils/encryptPassword.js";

// UPDATE
const updateUserDetails = async (req, res, next) => {
  try {
    const { id, isAdmin } = req.user;
    console.log(id);
    console.log(req.params.id);
    const saltRounds = 10;
    const updatedUserData = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }
    let updatedUser;
    if (req.body.password) {
      const encryptedPassword = await encryptPassword(
        req.body.password,
        saltRounds
      )
      updatedUserData.password = encryptedPassword;
    }
    if (Object.keys(updatedUserData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Plaes enter the input",
      });
    }
    if (id === req.params.id || isAdmin) {
      updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
        new: true,
      })
      return res.status(200).json({
        success: true,
        message: "User details updated successfully",
        user: updatedUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User details failed to update",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const userDeleted = async (req, res, next) => {
  try {
    const { id, isAdmin } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }
    if (id === req.params.id || isAdmin) {
      await User.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// GET
const getUser = async (req, res, next) => {
   try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
        return res.status(200).json({
            success: false,
            message: 'User not found'
        })
    }
    res.status(200).json({
        success: true,
        message: 'User found successfully',
        user
    })
   } catch (error) {
    res.status(400).json({
        success: false,
        message: error.message
    })
   }
}
// GET ALL
const getAllUsers = async (req, res, next) => {
try {
    const users = await User.find()
    let userMap = users.map((user) => {return user._doc});
    res.status(200).json({
       userMap
    })
} catch (error) {
    res.status(200).json({
        success: false,
        message: error.message
    })
}
}
//
// GET USER STATS

export { 
    updateUserDetails, 
    userDeleted,
    getUser,
    getAllUsers
 };
