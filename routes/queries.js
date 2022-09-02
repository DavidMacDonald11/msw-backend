import express from "express"
import {statusCheck, wake} from "../handlers/queries.js"

const router = express.Router()

router.get("/status", statusCheck)
router.post("/wake", wake)

export default router
