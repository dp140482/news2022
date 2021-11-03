const express = require("express");
const app = express();
const cors = require("cors");
const {acrmHandler, readHandler, saveHTMLHandler} = require("./handler");

app.use(express.json());
const datafile = __dirname + "/db/data.json";
const htmlfile = __dirname + "/db/chrono.html";

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
  readHandler(req, res, datafile)
});

app.get("/save/:date", (req, res) => {
  console.log("SAVE HTML");
  saveHTMLHandler(req, res, datafile, htmlfile)
});

app.post("/add", (req, res) => {
  console.log("POST");
  acrmHandler(req, res, "add", datafile);
});

app.put("/change/:id", (req, res) => {
  console.log("PUT");
  acrmHandler(req, res, "change", datafile);
});

app.delete("/remove", (req, res) => {
  console.log("DELETE");
  acrmHandler(req, res, "remove", datafile);
});

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening port ${port}...`));