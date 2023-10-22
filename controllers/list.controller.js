import List from "../models/list.model.js";

// CREATE LIST
const addList = async (req, res, next) => {
  try {
    let savedList;
    if (req.user.isAdmin) {
      const newList = new List(req.body);
      savedList = await newList.save();
    }
    res.status(200).json({
      success: true,
      message: "List added successfully",
      savedList,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE LIST
const deleteList = async (req, res, next) => {
  try {
    const listId = req.params.id;
    let list = await List.findById(listId);
    if (!list) {
      return res.status(400).json({
        success: false,
        message: "List not found",
      });
    }
    if (req.user.isAdmin) {
      list = await List.findByIdAndDelete(listId);
    }
    res.status(200).json({
      success: true,
      message: "List deleted successfully",
      list,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { addList, deleteList };
