// import 'module-alias/register'; 
/// <reference path="@types/index.d.ts" />

import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();

// Imports for routes
import kin from "@/routes/kin-routes";
import ability from "@/routes/abilities-routes";

// @ts-ignore : xss-clean has no type
import xss from "xss-clean";

// Set environment variable
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
app.use("/kin", kin);
app.use("/ability", ability);

// listen to server
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error, _promise) => {
  console.log(`Error: ${err.message}`);
});
