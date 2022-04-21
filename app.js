const express = require("express");
const log = require("./log");

const app = express();

app.use(require("./routes/index"));

app.listen(process.env.PORT, process.env.IP, () => {
    log("Express Init", "The express server has started.")
});
