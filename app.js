require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

// connect to mongodb
const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) // stop the URL deprecation warning in the terminal
  .then((result) => app.listen(3000))
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");
app.set("views", "pages"); // specify the folder name. default is views

app.use(express.static("public")); //.static() method allows us to select static files that should be made accessible to the user from the browser.
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // morgan is a third party middleware that logs the request details to the console

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

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// denote route parameter add ':' before id like so ":id"
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => console.log(err));
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

//404 page. Middleware that acts like a catch all to output the 404 page.
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
