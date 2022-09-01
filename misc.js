function log(label, message, middle = undefined) {
    console.log(label + " -- " + new Date().toLocaleString("en-US", { timeZone: "America/New_York" }))

    if(typeof(middle) !== "undefined") console.log(middle)
    if(typeof(message) !== "undefined") console.log(message)

    console.log()
}

async function asyncForEach(array, callback) {
    for(let i = 0; i < array.length; i++) { await callback(array[i], i, array) }
}

export {log, asyncForEach}
