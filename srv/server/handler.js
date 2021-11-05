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
      let content = JSON.parse(data);
      if (req.params.date) {
        content = content.filter(msg => msg.date === req.params.date);
      }
      res.send(JSON.stringify(content));
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

const checkAndPrepare = (res, file) => {
  fs.readFile(file, "utf-8", (err) => {
    if (err) {
      fs.writeFile(file, JSON.stringify([]), (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
          res.send(JSON.stringify({ result: 1 }));
        }
      });
    } else {
      res.send(JSON.stringify({ result: 1 }));
    }
  });
};

const ultimaHandler = (req, res, file) => {
  fs.writeFile(file, JSON.stringify(req.body), (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      console.log('success');
      res.send(JSON.stringify({ result: 1 }));
    }
  });
};

module.exports = {
  acrmHandler,
  readHandler,
  saveHTMLHandler,
  checkAndPrepare,
  ultimaHandler
};