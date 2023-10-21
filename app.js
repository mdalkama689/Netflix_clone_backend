import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
dotenv.config()
import morgan from 'morgan'
import bodyparser from 'body-parser'
import cookieParser from 'cookie-parser'

const app = express()
// Use the cookie-parser middleware
app.use(cookieParser())
app.use(express.json())
app.use(bodyparser.json())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/auth', userRoutes)
export default app