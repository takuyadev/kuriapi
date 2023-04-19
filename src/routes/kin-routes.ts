import { getKins, getKin } from "@/controllers/kin-controllers";
import { pagination } from "@/middlewares/pagination-middleware";
import { language } from "@/middlewares/language-middleware";
import express from "express";
const router = express.Router({});

router.get("/", pagination, language, getKins);
router.get("/:id", language, getKin);

export default router;
