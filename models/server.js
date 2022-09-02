import mongoose from "mongoose"

const serverSchema = new mongoose.Schema({
    serverId: {
        type: Number,
        required: true,
        unique: true
    },
    public: {
        type: Object,
        required: true
    }
})

export default mongoose.model("Server", serverSchema)
