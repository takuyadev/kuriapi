import { getAbilities, getAbility } from "@/controllers/ability-controllers";
import { language } from "@/middlewares/language-middleware";
import { pagination } from "@/middlewares/pagination-middleware";
import express from "express";
const app = express.Router({});

app.get("/", pagination, language, getAbilities);
app.get("/:id", language, getAbility);

export default app;
