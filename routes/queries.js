import express from "express"
import {statusCheck, wake, startServer} from "../handlers/queries.js"

const router = express.Router()

router.get("/status", statusCheck)
router.post("/wake", wake)
router.post("/start", startServer)

export default router
