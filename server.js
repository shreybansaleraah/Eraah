const path = require("path");
const express = require("express");
const app = express(); // create express app

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// start express server on port 5000
app.listen(3001, () => {});
