const fs = require("fs");

exports.logDir = () => {
    if (!fs.existsSync("logs")) {
        fs.mkdirSync("logs");
    }
}