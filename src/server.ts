import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

// @ts-ignore : xss-clean has no type
import xss from "xss-clean";
// Set environment variable
dotenv.config();
const { SERVER_PORT } = process.env;
const PORT = SERVER_PORT || 5000;

// Setup server
const app = express();

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollutiona
app.use(hpp());

// Enable CORS
app.use(cors());

// Parse body requests
app.use(express.json());

// Routes

// listen to server
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
