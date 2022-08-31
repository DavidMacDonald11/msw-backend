import mongoose from "mongoose"
import User from "./user.js"

mongoose.set("debug", true)
mongoose.Promise = Promise
mongoose.connect(process.env.DB_URI, {
    keepAlive: true
})

export default {User}
