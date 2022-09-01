import express from "express"
import {statusCheck} from "../handlers/queries.js"

const router = express.Router()

router.get("/status", statusCheck)

export default router
