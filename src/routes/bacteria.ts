import express from "express"
import {
  getBacterias,
  getBacteria,
  addBacteria,
  updateBacteria,
  deleteBacteria,
} from "../controllers/bacteria"
import { protect, authorize } from "../middlewares/auth"

const router = express.Router({ mergeParams: true })

router
  .route("/")
  .get(getBacterias)
  .post(protect, authorize("admin"), addBacteria)
router
  .route("/:id")
  .get(getBacteria)
  .put(protect, authorize("admin"), updateBacteria)
  .delete(protect, authorize("admin"), deleteBacteria)

export default router
