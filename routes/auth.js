import express from "express"
import {signup, signin} from "../handlers/auth.js"
import { ensureAdmin } from "../middleware/auth.js"

const router = express.Router()

router.post("/signup", signup) // TODO: After creating admin account, ensureAdmin
router.post("/signin", signin)
router.post("/login", signin)

export default router
