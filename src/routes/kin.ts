import { getKins, getKin } from "@controllers/kinControllers";
import express from "express";
const router = express.Router({});

router.get("/",   getKins);
router.get("/:id", getKin);

export default router;
