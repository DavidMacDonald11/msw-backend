import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import {log} from "./misc.js"
import errorHandler from "./handlers/error.js"
import { loginRequired, ensureAdmin } from "./middleware/auth.js"
import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"
import queriesRoutes from "./routes/queries.js"

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use("/api/auth", authRoutes)
app.use("/api/admin", ensureAdmin, adminRoutes)
app.use("/api/query", loginRequired, queriesRoutes)
app.get("/", (req, res) => {res.status(200).json({message: "OK"})})

app.use((req, res, next) => {
    let error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use(errorHandler)

app.listen(process.env.PORT, process.env.IP, () => {
    log("Express Init", `The express server has started on port ${process.env.PORT}.`)
})

export default app
