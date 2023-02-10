import express from "express"
import {
  getBacterias,
  getBacteria,
  addBacteria,
  updateBacteria,
  deleteBacteria,
} from "../controllers/bacteria"

const router = express.Router({ mergeParams: true })

router.route("/").get(getBacterias).post(addBacteria)
router.route("/:id").get(getBacteria).put(updateBacteria).delete(deleteBacteria)

export default router
