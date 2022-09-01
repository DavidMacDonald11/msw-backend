import {NodeSSH} from "node-ssh"

async function connect(pi = false) {
    const ssh = new NodeSSH()
    await ssh.connect(params(pi)).catch(error => {throw error})
    return async (cwd, bash) => {return (await ssh.execCommand(bash, {cwd: cwd})).stdout}
}

async function connectLocal() {
    const command = await connect()
    return async (func) => {return await command(process.env.PATH_TO_LOCAL_APP, `node app.js ${func}`)}
}

function params(pi = false) {
    return {
        host: process.env.SSH_HOST,
        port: (pi) ? process.env.SSH_PI_PORT : process.env.SSH_PORT,
        username: process.env.SSH_USER,
        privateKey: process.env.SSH_PRIVATE_KEY,
        passphrase: process.env.SSH_PASS,
        readyTimeout: 3000
    }
}

export {connect, connectLocal}
