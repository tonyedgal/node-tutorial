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

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/single-blog", (req, res) => {
  Blog.findById("61c04ecf83f96706cb2bd455")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

//choose the request you want to listen for
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "June is pretty",
      snippet: "Lorem ipsum, dolor sit amet consectetur",
    },
    {
      title: "Gabby is pretty",
      snippet: "Lorem ipsum, dolor sit amet consectetur",
    },
    {
      title: "Amaebi is pretty",
      snippet: "Lorem ipsum, dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs }); // pass the dynamic data as an object to the ejs file. Use blogs instead of {blogs: blogs}, since they're both the same name.
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

//404 page. Middleware that acts like a catch all to output the 404 page.
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
