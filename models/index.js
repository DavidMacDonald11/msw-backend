import mongoose from "mongoose"
import User from "./user.js"
import Server from "./server.js"

mongoose.Promise = Promise
mongoose.connect(process.env.DB_URI, {
    keepAlive: true
})

export default {User, Server}
