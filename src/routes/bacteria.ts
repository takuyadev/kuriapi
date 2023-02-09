import express from "express"
import { getBacterias, getBacteria } from "../middlewares/bacteria"

const router = express.Router({ mergeParams: true })

router.route("/").get(getBacterias)
router.route("/:id").get(getBacteria)

export default router
