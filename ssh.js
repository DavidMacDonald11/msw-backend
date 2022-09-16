import {NodeSSH} from "node-ssh"

async function connect(pi = false) {
    const ssh = new NodeSSH()
    await ssh.connect(params(pi))
    return async (cwd, bash) => ((await ssh.execCommand(bash, {cwd})).stdout)
}

async function connectLocal() {
    const command = await connect()
    return async func => (await command(process.env.PATH_TO_LOCAL_APP, `node src/app.js ${func}`))
}

function params(pi = false) {
    return {
        host: process.env.SSH_HOST,
        port: (pi) ? process.env.SSH_PI_PORT : process.env.SSH_PORT,
        username: (pi) ? process.env.SSH_PI_USER : process.env.SSH_USER,
        privateKey: process.env.SSH_PRIVATE_KEY,
        passphrase: process.env.SSH_PASS,
        readyTimeout: (pi) ? 2000 : 4000
    }
}

export {connect, connectLocal}
