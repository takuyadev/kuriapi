import express from "express"
import {
  addAbility,
  deleteAbility,
  getAbilities,
  getAbility,
  updateAbility,
} from "../controllers/ability"

const router = express.Router({ mergeParams: true })

router.route("/").get(getAbilities).post(addAbility)
router.route("/:id").get(getAbility).put(updateAbility).delete(deleteAbility)

export default router
