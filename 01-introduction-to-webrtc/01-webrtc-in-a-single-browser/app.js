// All imports
const express = require("express");
const path = require("path");

// Execute the express function
const app = express();

/* 
  Set the view engine to show dynamic content in html with "ejs" files
  2nd argument "views" is the folder name which has html files
*/
app.set("view engine", "ejs");
app.set("views", "views");

// Serving the "public" folder statically (Serve the files in the folder as if they were in the root folder)
app.use(express.static(path.join(path.dirname(require.main.filename), "public")));

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

// Start the server on localhost with port "3000"
app.listen(3000);