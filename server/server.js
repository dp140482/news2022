const express = require("express");
const app = express();
const cors = require("cors");
const {acrmHandler, readHandler} = require("./handler");
const filePathAndName = "/server/db/data.json";

app.use(express.json());
app.use("/", express.static("server"));
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

app.get("/api/paymentlist", (req, res) => {
  readHandler(req, res, filePathAndName)
});

app.post("/api/paymentlist", (req, res) => {
  acrmHandler(req, res, "add", filePathAndName);
});

app.put("/api/paymentlist/:id", (req, res) => {
  acrmHandler(req, res, "change", filePathAndName);
});

app.delete("/api/paymentlist/:id", (req, res) => {
  acrmHandler(req, res, "remove", filePathAndName);
});

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening port ${port}...`));