function log(label, message = undefined, middle = undefined) {
    console.log(label + " -- " + new Date().toLocaleString("en-US", { timeZone: "America/New_York" }))

    if(middle !== undefined) console.log(middle)
    if(message !== undefined) console.log(message)

    console.log("")
}

async function asyncForEach(array, callback) {
    for(let i = 0; i < array.length; i++) { await callback(array[i], i, array) }
}

export {log, asyncForEach}
