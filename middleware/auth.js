import jwt from "jsonwebtoken"

function loginRequired(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if(decoded) return next()

            return next({
                status: 401,
                message: "Please login first"
            })
        })

    } catch(error) {
        return next({
            status: 401,
            message: "Please login first"
        })
    }
}

function ensureAdmin(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if(decoded && decoded.username == "admin") { return next() }

            return next({
                status: 401,
                message: "Unauthorized"
            })
        })
    } catch(error) {
        return next({
            status: 401,
            message: "Unauthorized"
        })
    }
}


export {loginRequired, ensureAdmin}
