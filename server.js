import db from "./models/index.js"
import {connect, connectLocal} from "./ssh.js"
import {log, asyncForEach} from "./misc.js"

class Server {
    static status = {
        isOn: false,
        anyOn: false,
        waiting: false,
        failed: false
    }

    static servers = []
    static state = {}

    static async wake() {
        if(Server.status.isOn) return

        function failCatch(error) {
            log("WOL", error.message)
            Server.status.waiting = false
            Server.status.failed = true
            return error
        }

        try {
            const command = await connect(true)
            const result = await command(process.env.PATH_TO_PI_WOL, process.env.PI_WOL)

            log("WOL Command", result.stdout)
            Server.status.waiting = true
            Server.status.failed = false

            Server.pingWake(0, failCatch)
        } catch(error) {throw failCatch(error)}
    }

    static async ping() {
        let appCommand = null

        try {
            appCommand = await connectLocal()
            await appCommand("ping")
            Server.status.isOn = true
        } catch(error) { Server.status.isOn = false }
        finally { return appCommand }
    }

    static async pingWake(attempts, failCatch) {
        if(attempts > 12) {failCatch({message: "The host did not wake up."})}

        if(await Server.ping() === null)
            return setTimeout(Server.pingWake, 10000, attempts + 1, failCatch)

        Server.status.waiting = false
        log("WOL Ping", "The host woke up.")
        setTimeout(Server.statusCheck, 1000)
    }

    static async statusCheck() {
        if(Server.status.waiting) return

        const appCommand = await Server.ping()
        if(appCommand === null) return Server.takeDatabase()

        await Server.getFullState(appCommand)
        await Server.retainDatabase()
    }

    static async getFullState(appCommand) {
        const data = JSON.parse(await appCommand("getFullState")).data
        Server.servers = data.servers
        Server.state = data.state

        Server.status.anyOn = Server.servers.some(server => (server.state.isOn))
    }

    static async retainDatabase() {
        await asyncForEach(Server.servers, async server => {
            const filter = {serverId: server.public.id}
            const update = {serverId: server.public.id, public: server.public}
            const options = {upsert: true}

            await db.Server.findOneAndUpdate(filter, update, options)
        })
    }

    static async takeDatabase() {
        Server.servers = []

        await asyncForEach(await db.Server.find({}), async server => {
            Server.servers.push({public: server.public, state: {isOn: false}})
        })
    }

    static async startServer(id) {
        await Server.statusCheck()
        const appCommand = await connectLocal()
        await appCommand(`startServer ${id}`)
    }
}

export default Server
