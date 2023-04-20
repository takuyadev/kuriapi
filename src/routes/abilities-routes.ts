import { getAbilities, getAbility } from "@/controllers/ability-controllers";
import { advancedQueries } from "@/middlewares/queries-middleware";
import { params } from "@/middlewares/params-middleware";
import express from "express";
const app = express.Router({});

app.get("/", advancedQueries, getAbilities);
app.get("/:id", advancedQueries, params, getAbility);

export default app;
