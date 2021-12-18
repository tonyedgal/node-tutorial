const express = require("express");

// express app
const app = express();

// listen for requests
app.listen(3000);

//choose the request you want to listen for
app.get("/", (req, res) => {
  //   res.send("<h1>meeee</h1>");
  res.sendFile("./pages/index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  //   res.send("<h1>meeee</h1>");
  res.sendFile("./pages/about.html", { root: __dirname });
});

//redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 page
app.use((req, res) => {
  res.sendFile("./pages/404.html", { root: __dirname });
});
