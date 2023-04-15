import 'module-alias/register'; 
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";

// Imports for routes
import bacteria from "@routes/bacteria";
import ability from "@routes/ability";

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

// Enable CORS
app.use(morgan("dev"));

// Parse body requests
app.use(express.json());

// Routes
app.use("/bacteria", bacteria);
app.use("/ability", ability);

// listen to server
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error, _promise) => {
  console.log(`Error: ${err.message}`);
});
