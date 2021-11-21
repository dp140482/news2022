const fs = require("fs");
// const { v4: uuid } = require('uuid');

const file = __dirname + '/' + process.argv[2];
const endfile = __dirname + '/conv/' + process.argv[2];
fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let news = JSON.parse(data);
    const date = news[0].date;
    let mcounter = 0;
    let articles = [];
    const messages = news.map(msg => {
        let counter = 0;        
        return msg.text.map(paragraph => {
            let nid = msg.id + '-' + counter;
            articles.push({
                id: mcounter,
                tags: msg.tags,
                parts: [ nid ]
            });
            mcounter++;
            let result = {
                id: nid,
                text: paragraph
            };
            counter++;
            if (msg.time) result = {...result, time: msg.time};
            return result;
        });
    }).flat(Infinity);

    const newData = {date, messages, articles, deleted: []};
    fs.writeFile(endfile, 
        JSON.stringify(newData, null, 4),
        err => { if (err) console.error(err) }
    );
});