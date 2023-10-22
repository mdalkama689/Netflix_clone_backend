import Movie from "../models/movies.model.js";

// CREATE MOVIE
const addMovie = async (req, res, next) => {
  try {
    let savedMovie;
    if (req.user.isAdmin) {
      const newMovie = new Movie(req.body);
      savedMovie = await newMovie.save();
    }
    res.status(200).json({
      success: true,
      message: "Movie added successfully",
      savedMovie,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE MOVIE DETAILS
const updateMovie = async (req, res, next) => {
  try {
    let savedMovie;
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(200).json({
        success: false,
        message: "Movie not found",
      });
    }
    if (req.user.isAdmin) {
      const updatedMovieData = req.body;
      savedMovie = await Movie.findByIdAndUpdate(movieId, updatedMovieData, {
        new: true,
      });
    }
    res.status(200).json({
      success: true,
      message: "Movie update successfully",
      savedMovie,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE MOVIE
const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    let deletedMovie;
    if (req.user.isAdmin) {
      deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    }
    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      deletedMovie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting movie",
    });
  }
};

// GET MOVIE
const getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Movie found successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET RANDOM
const randomMovie = async (req, res, next) => {
  try {
    const type = req.query.type;
    let movie;
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL MOVIES
const getAllMovies = async (req, res, next) => {
  try {
    let movies;
    if (req.user.isAdmin) {
      movies = await Movie.find();
      if (movies.length > 0) {
        res.status(200).json({
          success: true,
          message: "Movies retrieved successfully",
          movies: movies.reverse(),
        });
      } else {
        res.status(200).json({
          success: true,
          message: "No movies found",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve movies",
      error: error.message, // You can provide the specific error message
    });
  }
};

export {
  addMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  randomMovie,
  getAllMovies,
};
