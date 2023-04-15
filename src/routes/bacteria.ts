import { getBacterias } from "@controllers/bacteria";
import express from "express";
const app = express.Router({});

app.get("/", getBacterias);

export default app;
