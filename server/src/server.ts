import express from "express"
import dotenv from "dotenv"
import bacteria from "./routes/bacteria"
import connect from "./config/db"

// Set environment variable
dotenv.config()
const { SERVER_PORT, MONGODB_URI } = process.env
const PORT = SERVER_PORT || 5000

// Connect to database
MONGODB_URI && connect(MONGODB_URI)

// Setup server
const app = express()

// Routes
app.use("/bacteria", bacteria)

// listen to server
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})
