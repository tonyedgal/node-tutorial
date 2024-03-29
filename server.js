const http = require("http"); // require http module - a core node module
const fs = require("fs");

const server = http.createServer((request, response) => {
  console.log("Request made");
  console.log(request.url, request.method, request.path);

  // set header content type
  response.setHeader("Content-Type", "text/html");

  fs.readFile("./pages/index.html", (error, data) => {
    if (error) {
      console.log(error);
      response.end();
    } else {
      response.write(data);
      response.end();
    }
  });
}); // use .createServer method to create a server with request and response objects as the arguments

server.listen(3000, "localhost", () => {
  console.log("listening for request on port 3000");
}); // use listen method to listen to a server via a specified port number
