const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", (req, res, next) => {
  /* 
      To handle favicon request issue.
      If we don't use this code then each request runs twice.
    */
  if (req.originalUrl.includes("favicon.ico")) {
    return res.status(204).end();
  }
  // Forward the incoming request to the next middleware
  next();
});

app.get("/", (req, res, next) => {
    res.render("index");
});

app.listen(3000);