import Server from "../server.js"

async function statusCheck(req, res, next) {
    try {
        await Server.statusCheck()

        return res.status(200).json({
            status: Server.status,
            stats: Server.stats,
            servers: Server.servers
        })
    } catch(error) {
        return next({
            status: 500,
            message: `Status check: ${error.message}`
        })
    }
}

export {statusCheck}
