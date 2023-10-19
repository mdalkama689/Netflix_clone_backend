import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
dotenv.config()
import morgan from 'morgan'
import bodyparser from 'body-parser'

const app = express()
app.use(express.json())
app.use(bodyparser.json())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/auth', userRoutes)
export default app