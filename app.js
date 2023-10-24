import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import moviesRoutes from "./routes/movie.routes.js";
import listRoutes from "./routes/list.routes.js";
dotenv.config();
import morgan from "morgan";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors'


const app = express();
const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOption))

// Use the cookie-parser middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyparser.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/movie", moviesRoutes);
app.use("/api/list", listRoutes);
export default app;
