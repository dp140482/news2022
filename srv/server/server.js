const express = require("express");
const app = express();
const cors = require("cors");
const handlers = require("./handler");

app.use(express.json());
let store = "data.json";
let datafile = __dirname + "/db/" + store;
const htmlpath = __dirname + "/db/";

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

app.get("/get", (req, res) => {
  console.log("GET");
  handlers.readHandler(req, res, datafile)
});

app.get("/get/:date", (req, res) => {
  console.log("GET " + req.params.date);
  handlers.readHandler(req, res, datafile)
});

app.get("/save/:date", (req, res) => {
  console.log("Save HTML " + req.params.date);
  handlers.saveHTMLHandler(req, res, datafile, htmlpath)
});

app.get("/commute-store/:store", (req, res) => {
  console.log("Commute to " + req.params.store);
  store = req.params.store;
  datafile = __dirname + "/db/" + store;
  handlers.checkAndPrepare(res, datafile);
});

app.post("/add", (req, res) => {
  console.log("POST");
  handlers.acrmHandler(req, res, "add", datafile);
});

app.put("/changeAll", (req, res) => {
  console.log("PUT");
  handlers.ultimaHandler(req, res, datafile);
});

app.put("/change/:id", (req, res) => {
  console.log("PUT");
  handlers.acrmHandler(req, res, "change", datafile);
});

app.delete("/remove", (req, res) => {
  console.log("DELETE");
  handlers.acrmHandler(req, res, "remove", datafile);
});

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening port ${port}...`));