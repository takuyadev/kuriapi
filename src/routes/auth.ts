import express from "express"
import { login, register } from "../controllers/auth"
import { protect, authorize } from "../middlewares/auth"

const router = express.Router({ mergeParams: true })

router.route("/login").post(login)
router.route("/register").post(register)

export default router
