import express from "express"

const router = express.Router()

router.get("/:which", (req, res) => {
    res.send(JSON.stringify({
        message: `Backend at ${req.params.which}`
    }))
})

export default router
