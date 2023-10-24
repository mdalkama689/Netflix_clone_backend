import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  addMovie,
  deleteMovie,
  updateMovie,
  getMovie,
  randomMovie,
  getAllMovies,
} from "../controllers/movie.controller.js";

const router = Router();

router.post("/", isLoggedIn, addMovie);
router.put("/:id", isLoggedIn, updateMovie);
router.delete("/:id", isLoggedIn, deleteMovie);
router.get("/find/:id", getMovie);
router.get("/random", isLoggedIn, randomMovie);
router.get("/", isLoggedIn, getAllMovies);

export default router;
