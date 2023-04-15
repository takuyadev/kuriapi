import { getBacterias } from "@controllers/bacteria";
import express from "express";
const router = express.Router({});

router.get("/", getBacterias);

export default router;
