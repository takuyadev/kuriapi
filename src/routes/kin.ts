import { getKin, getKinById } from "@controllers/kin";
import express from "express";
const router = express.Router({});

router.get("/", getKin);
router.get("/:id", getKinById);

export default router;
