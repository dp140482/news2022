const fs = require("fs");
const {addData, joinData, newFileData} = require("./dataworks");
const htmlFromData = require("./htmlworks");

const addDB = (file, err, data, newData, date) => {
    if (err && err.code === 'ENOENT') {
        fs.writeFile(file,
            JSON.stringify(joinData(newFileData, {date, ...newData}), null, 4),
            err => { if (err) console.error(err) }
        ); 
    } else {
        fs.writeFile(file, JSON.stringify(addData(JSON.parse(data), newData), null, 4), 
            err => { if (err) console.error(err) }
        );
        return 1;
    }
};

const setDB = (file, err, data, newData, date) => {
    if (err && err.code === 'ENOENT') {
        fs.writeFile(file,
            JSON.stringify(joinData(newFileData, {date, ...newData}), null, 4),
            err => { if (err) console.error(err) }
        );
    } else {
        fs.writeFile(file,
            JSON.stringify(joinData(JSON.parse(data), newData), null, 4), 
            err => { if (err) console.error(err) }
        );
    }
};

const saveHTML = (html, err, data) => {
    if (err && err.code === 'ENOENT') return;
    fs.writeFile(html,
        htmlFromData(data),
        err => { if (err) console.error(err) }
    );
};

module.exports = {addDB, setDB, saveHTML};