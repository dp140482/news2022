const fs = require("fs");
const {addDB, setDB, saveHTML} = require("./filewriting");
const {toNumDate} = require("./datetools");

const handler = (req, res, options) => {
    const file = options.path + req.params.date + ".json";
    switch (options.todo) {
        case "get":
            fs.readFile(file, "utf-8", (err, data) => res.send(data));
            break;
        case "set":
            fs.readFile(file, "utf-8", (err, data) => {
                setDB(file, err, data, req.body, req.params.date);
                res.send(JSON.stringify(1));
            });
            break;
        case "add":
            fs.readFile(file, "utf-8", (err, data) => {
                addDB(file, err, data, req.body, req.params.date);
                res.send(JSON.stringify(1));
            });
            break;
        case "save":
            fs.readFile(file, "utf-8", (err, data) => {
                const html = options.htmlPath + toNumDate(req.params.date) + ".html";
                saveHTML(html, err, JSON.parse(data));
                res.send(JSON.stringify(1));
            });
            break;
        default:
            console.log("Unknown option");
            res.send(JSON.stringify(0));
    }
};

module.exports = handler;