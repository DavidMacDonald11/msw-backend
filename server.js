import {connectLocal} from "./ssh.js"

class Server {
    static status = {
        isOn: false,
        waiting: false,
        failed: false
    }

    static servers = []
    static state = {}

    static async wake() {
        if(this.status.isOn) return

        try {
            const command = await connect(true)
            const result = await command(process.env.PATH_TO_PI_WOL, process.env.PI_WOL)

            log("WOL Command", result.stdout)
            this.status.waiting = true
            this.status.failed = false

            this.pingWake(0)
        } catch(error) {
            log("WOL", error)
            this.status.waiting = false
            this.status.failed = true
        }
    }

    static async ping(appCommand) {
        try {
            await appCommand("ping")
            this.status.isOn = true
        } catch(error) { this.status.isOn = false }
        finally { return this.status.isOn }
    }

    static async pingWake(attempts) {
        if(attempts++ > 12) {
            this.status.waiting = false
            this.status.failed = true

            log("WOL Ping", "The host did not wake up.")
            return
        }

        await this.ping(await connectLocal())

        if(!this.status.isOn) {
            setTimeout(this.pingWake, 10000, attempts)
            return
        }

        this.status.waiting = false;
        log("WOL Ping", "The host woke up.")
        setTimeout(this.statusCheck, 1000)
    }

    static async statusCheck() {
        const appCommand = await connectLocal()

        if(!(await this.ping(appCommand))) return
        await this.getFullState(appCommand)
    }

    static async getFullState(appCommand) {
        const data = JSON.parse(await appCommand("getFullState")).data
        this.servers = data.servers
        this.state = data.state
    }
}

export default Server
