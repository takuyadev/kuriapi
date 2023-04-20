import express from "express";
import { getKins, getKin } from "@/controllers/kin-controllers";
import { advancedQueries } from "@/middlewares/queries-middleware";
import { params } from "@/middlewares/params-middleware";
const router = express.Router({});

router.get("/", advancedQueries, params, getKins);
router.get("/:id", advancedQueries, params, getKin);

export default router;
