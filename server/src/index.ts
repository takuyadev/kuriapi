import express from "express"
import dotenv from "dotenv"
import bacteria from "./routes/bacteria"

// Set environment variable
dotenv.config()

// Setup server
const app = express()

// Routes
app.use("/bacteria", bacteria)

// listen to server
app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port: ${process.env.SERVER_PORT}`)
})
