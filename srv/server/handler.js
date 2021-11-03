const method = require("./methods");
const fs = require("fs");
const htmltools = require("./htmltools");
const datetools = require("./datetools");

const actions = {
  add: method.add,
  change: method.change,
  remove: method.remove,
};

const readHandler = (req, res, file) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
};

const saveHTMLHandler = (req, res, file, htmlpath) => {
  const date = req.params.date;
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      let htmlContent = htmltools.toHTML(JSON.parse(data), date);
      fs.writeFile(htmlpath + datetools.toNumDate(date) + ".html", htmlContent, (err) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
          res.send(JSON.stringify({ result: 1 }));
        }
      });
    }
  });
};

const acrmHandler = (req, res, action, file) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      let newItem = actions[action](JSON.parse(data), req);
      fs.writeFile(file, newItem, (err) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
          res.send(JSON.stringify({ result: 1 }));
        }
      });
    }
  });
};

module.exports = {
  acrmHandler,
  readHandler,
  saveHTMLHandler
};