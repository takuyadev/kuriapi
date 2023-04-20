import { getKins, getKin } from "@/controllers/kin-controllers";
import { pagination } from "@/middlewares/pagination-middleware";
import { language } from "@/middlewares/language-middleware";
import express from "express";
import { params } from "@/middlewares/params-middleware";
const router = express.Router({});

router.get("/", pagination, language, params, getKins);
router.get("/:id", language, params, getKin);

export default router;
