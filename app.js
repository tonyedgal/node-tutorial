const express = require("express");

// express app
const app = express();

//register view engine
app.set("view engine", "ejs");
app.set("views", "pages"); // specify the folder name. default is views

// listen for requests
app.listen(3000);

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

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
