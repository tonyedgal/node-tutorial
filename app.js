const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// express app
const app = express();
const dbURI =
  "mongodb+srv://spaceman:node-tut-db@node-tut.8hflk.mongodb.net/node-tut?retryWrites=true&w=majority";

//register view engine
app.set("view engine", "ejs");
app.set("views", "pages"); // specify the folder name. default is views

// listen for requests
app.listen(3000);

app.use((req, res, next) => {
  console.log("new request made");
  console.log(`host: ${req.hostname}`);
  console.log(`path: ${req.path}`);
  console.log(`method: ${req.method}`);
  next(); //used to tell the middleware to proceed to the next function after running
}); //middleware that runs between the browser's request and the server's response - .use() method

app.use(express.static("public")); //.static() method allows us to select static files that should be made accessible to the user from the browser.
app.use(morgan("dev")); // morgan is a third party middleware that logs the request details to the console
app.use(morgan("tiny")); // you can choose the format you want the details to be outputted

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
