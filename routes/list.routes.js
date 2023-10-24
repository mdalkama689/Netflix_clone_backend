import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  addList,
  deleteList,
  getList,
} from "../controllers/list.controller.js";
const router = Router();

router.post("/", isLoggedIn, addList);
router.delete("/:id", isLoggedIn, deleteList);
router.get("/", isLoggedIn, getList);
export default router;
