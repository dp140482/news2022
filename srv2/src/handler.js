const fs = require("fs");

const joinData = (data, newData) => {
    let joinedData = {...data};
    if (newData.message) { 
        joinedData = { ...joinedData, messages: [...data.messages, newData.message] };
    }
    if (newData.articles) {
        joinedData = { ...joinedData, articles: newData.articles };
    }
    if (newData.deleted) {
        joinedData = { ...joinedData, deleted: newData.deleted };
    }
    return joinedData;
};

const newFileData = {
    messages: [],
    articles: [],
    deleted: []
};

const setToFile = (file, err, data, newData, date) => {
    if (err && err.code === 'ENOENT') {
        fs.writeFile(file,
            JSON.stringify(joinData(newFileData, {date, ...newData}), null, 4),
            err => console.error(err)
        );
    } else {
        fs.writeFile(file, JSON.stringify(joinData(JSON.parse(data), newData), null, 4), 
            err => console.error(err)
        );
    }
};


const addData = (data, newData) => {
    let joinedData = {...data};
    if (newData.message) { 
        joinedData = { ...joinedData, messages: [...joinedData.messages, newData.message] };
    }
    if (newData.articles) {
        joinedData = { ...joinedData, articles: [...joinedData.articles, newData.articles] };
    }
    if (newData.deleted) {
        joinedData = { ...joinedData, deleted: [...joinedData.deleted, newData.deleted]  };
    }
    return joinedData;
};

const addToFile = (file, err, data, newData) => {
    if (err && err.code === 'ENOENT') {
      return 0;  
    } else {
        fs.writeFile(file, JSON.stringify(addData(JSON.parse(data), newData), null, 4), 
            err => console.error(err)
        );
        return 1;
    }
};

const handler = (req, res, options) => {
    const file = options.path + req.params.date + ".json";
    switch (options.todo) {
        case "get":
            fs.readFile(file, "utf-8", (err, data) => {
                res.send(JSON.stringify(
                    (err && err.code === 'ENOENT')
                        ? {error: "File not found"}
                        : data
                ));
            });
            break;
        case "set":
            fs.readFile(file, "utf-8", (err, data) => {
                setToFile(file, err, data, req.body, req.params.date);
                res.send(JSON.stringify(1));
            });
            break;
        case "add":
            fs.readFile(file, "utf-8", (err, data) => {
                res.send(JSON.stringify(addToFile(file, err, data, req.body)));
            });
            break;
        default:
            console.log("Unknown option");
            res.send(JSON.stringify(0));
    }
};

module.exports = handler;