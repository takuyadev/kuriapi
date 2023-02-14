const mongoose = require("mongoose")

const connectDB = async (URI: string) => {
  const conn = await mongoose.connect(URI, { autoIndex: false })
  console.log(`MongoDB connected: ${conn.connection.host}`)
}

export default connectDB
