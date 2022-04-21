module.exports = (label, message, middle = undefined) => {
    console.log(label + " -- " + new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));

    if(typeof(middle) !== "undefined") console.log(middle);
    if(typeof(message) !== "undefined") console.log(message);

    console.log()
}
