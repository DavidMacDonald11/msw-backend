import mongoose from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre("save", async function(next) {
    try {
        console.log(this)
        if(!this.isModified("password")) return next()

        this.password = await bcrypt.hash(this.password, 10)
        return next()
    } catch(error) { return next(error) }
})

UserSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        return await bcrypt.compare(candidatePassword, this.password)
    } catch(error) { return next(error) }
}

export default mongoose.model("User", UserSchema)
