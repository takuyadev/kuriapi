import express from "express";
import { getKins, getKin } from "@/controllers/kin-controllers";
import { advancedQueries } from "@/middlewares/queries-middleware";
import { params } from "@/middlewares/params-middleware";
import { error } from "console";
const router = express.Router({});

router.get("/", advancedQueries, params, getKins, error);
router.get("/:id", advancedQueries, params, getKin, error);

export default router;
