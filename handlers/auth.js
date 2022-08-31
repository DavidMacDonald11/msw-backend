import jwt from "jsonwebtoken"
import db from "../models/index.js"

async function signin(req, res, next) {
    try {
        let user = await db.User.findOne({
            username: req.body.username
        })

        let {id, username} = user

        if(await user.comparePassword(req.body.password)) {
            let token = jwt.sign({id, username}, process.env.SECRET_KEY)
            return res.status(200).json({id, username, token})
        }

        return next({
            status: 400,
            message: "Invalid username or password"
        })
    } catch(error) {
        return next({
            status: 400,
            message: "Invalid username or password"
        })
    }
}

async function signup(req, res, next) {
    try {
        let user = await db.User.create(req.body)
        let {id, username} = user
        let token = jwt.sign({id, username}, process.env.SECRET_KEY)

        return res.status(200).json({id, username, token})
    } catch(error) {
        if(error.code == 11000) {
            error.message = "Sorry, that username is taken"
        }

        return next({
            status: 400,
            message: error.message
        })
    }
}

export {signin, signup}
