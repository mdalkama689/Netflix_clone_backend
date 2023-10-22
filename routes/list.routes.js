import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { addList, deleteList } from "../controllers/list.controller.js";
const router = Router();

router.post("/", isLoggedIn, addList);
router.delete("/:id", isLoggedIn, deleteList);

export default router;
