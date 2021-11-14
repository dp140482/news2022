const express = require("express");
const app = express();
const cors = require("cors");
const {handler} = require("./handler");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.header(("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"));
    return res.status(200).json({});
  }
  next();
});

app.get("/get-all/:date", (req, res) => handler(req, res, { todo: "get", method: "all" }));
app.get("/get-msg/:date/:id", (req, res) => handler(req, res, {todo: "get", method: "msg"}));
app.get("/save/:date", (req, res) => handler(req, res, {todo: "save-html"}));
app.get("/collect/:date", (req, res) => handler(req, res, {todo: "collect"}));

app.post("/add-msg/:date", (req, res) => handler(req, res, {todo: "add"}));

app.put("/rewrite-all/:date", (req, res) => handler(req, res, {todo: "rewrite", method: "all"}));
app.put("/rewrite-msg/:date/:id", (req, res) => {
  handler(req, res, {todo: "rewrite", method: "msg"});
});

app.delete("/delete-all/:date", (req, res) => handler(req, res, {todo: "delete", method: "all"}));
app.delete("/delete-all/:date/:id", (req, res) => {
  handler(req, res, {todo: "delete", method: "all"});
});

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening port ${port}...`));