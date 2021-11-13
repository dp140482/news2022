const method = require("./methods");
const fs = require("fs");
const htmltools = require("./htmltools");
const datetools = require("./datetools");

const path = __dirname + "/db/";
const pathHTML = __dirname + "/html/";

const processWriteResult = (res, err) => {
  if (err) {
    res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
  } else {
    res.send(JSON.stringify({ result: 1 }));
  }
};

const process = (req, res, err, data, options) => {
  let file, newData;
  console.log("Handler: " + options.todo + options.method);
  if (err) 
    if (options.todo === "add" || (options.todo === "rewrite" && options.method === "all" )) {
      file = path + req.params.date + ".json";
      fs.writeFile(file, method.add([], req), err => processWriteResult(res, err));
      return;
    } else {
    console.log(err);
    res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    return;
  }
  switch (options.todo) {

    case "get": 
      switch (options.method) {
        case "msg":
          res.send(JSON.parse(data).filter(msg => msg.id === req.params.id));
          break;
        case "all":
          res.send(data);
      }
      break;

    case "add":
      file = path + req.params.date + ".json";
      newData = method.add(JSON.parse(data), req);
      fs.writeFile(file, newData, err => processWriteResult(res, err));
      break;

    case "save-html":
      file = pathHTML + datetools.toNumDate(req.params.date) + ".html";
      htmlContent = htmltools.toHTML(JSON.parse(data), req.params.date);
      fs.writeFile(file, htmlContent, err => processWriteResult(res, err));
      break;

    case "rewrite":
      file = path + req.params.date + ".json";
      if (options.method === "msg") {
          newData = method.change(JSON.parse(data), req);
          fs.writeFile(file, newData, err => processWriteResult(res, err));
      } else if (options.method === "all") {
        console.log("rewrite all");
        fs.writeFile(file, method.add([], req), err => processWriteResult(res, err));
      }
      break;

    case "delete":
      if (options.method === "msg") {
        file = path + req.params.date + ".json";
        newData = method.remove(JSON.parse(data), req);
        fs.writeFile(file, newData, err => processWriteResult(res, err));
      }
      break;
  }
};

const handler = (req, res, options) => {
  const file = path + req.params.date + ".json";
  console.log("handler");
  if (options.todo === "rewrite" && options.method === "all")
    fs.writeFile(file,  JSON.stringify(req.body, null, 4), err => processWriteResult(res, err));
  else if (options.todo === "delete" && options.method === "all")
    fs.writeFile(file, JSON.stringify([], null, 4), err => processWriteResult(res, err));
  else
    fs.readFile(file, "utf-8", (err, data) => process(req, res, err, data, options));
};

module.exports = {handler}
