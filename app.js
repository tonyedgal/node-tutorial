const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://spaceman:node-tut-db@node-tut.8hflk.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) // stop the URL deprecation warning in the terminal
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");
app.set("views", "pages"); // specify the folder name. default is views

app.use(express.static("public")); //.static() method allows us to select static files that should be made accessible to the user from the browser.
app.use(morgan("dev")); // morgan is a third party middleware that logs the request details to the console
app.use(morgan("tiny")); // you can choose the format you want the details to be outputted

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

//404 page. Middleware that acts like a catch all to output the 404 page.
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
