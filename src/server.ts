import express from "express"
import dotenv from "dotenv"
import connect from "./config/db"
import mongoSanitize from "express-mongo-sanitize"
import helmet from "helmet"
import hpp from "hpp"
import { rateLimit } from "express-rate-limit"
import cors from "cors"

// @ts-ignore : xss-clean has no type
import xss from "xss-clean"

import auth from "./routes/auth"
import ability from "./routes/ability"
import bacteria from "./routes/bacteria"

// Set environment variable
dotenv.config()
const { SERVER_PORT, MONGODB_URI } = process.env
const PORT = SERVER_PORT || 5000

// Connect to database
MONGODB_URI && connect(MONGODB_URI)

// Setup server
const app = express()

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
})
app.use(limiter)

// Prevent http param pollutiona
app.use(hpp())

// Enable CORS
app.use(cors())

// Parse body requests
app.use(express.json())

// Routes
app.use("/bacteria", bacteria)
app.use("/ability", ability)
app.use("/auth", auth)

// listen to server
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})
