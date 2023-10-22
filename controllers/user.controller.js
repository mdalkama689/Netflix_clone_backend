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
      );
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
      });
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
};

// GET
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// GET ALL
const getAllUsers = async (req, res, next) => {
  try {
    let users;
    if (req.user.isAdmin) {
      users = await User.find();
    }

    res.status(200).json({
      success: true,
      message: "User data fetch successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET USER STATS
const getUserStats = async (req, res, next) => {
  try {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Fetch all data successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { updateUserDetails, userDeleted, getUser, getAllUsers, getUserStats };
