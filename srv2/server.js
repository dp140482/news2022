const express = require("express");
const app = express();
const cors = require("cors");
const handler = require("./src/handler");

const path = __dirname + "/db/";

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

app.get("/get/:date", (req, res) => {
  handler(req, res, {todo: "get", path});
});
app.put("/set/:date", (req, res) => {
  handler(req, res, {todo: "set", path});
});
app.post("/add/:date", (req, res) => {
  handler(req, res, {todo: "add", path});
});

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening port ${port}...`));