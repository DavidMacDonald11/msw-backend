import express from "express"
import log from "./log/index.js"
import api from "./routes/index.js"

const app = express()

app.use(api)

app.listen(process.env.PORT, process.env.IP, () => {
    log("Express Init", "The express server has started.")
})
