const http = require("http"); // require http module - a core node module

const server = http.createServer((request, response) => {
  console.log("Request made");
  console.log(request.url, request.method);
}); // use .createServer method to create a server

server.listen(3000, "localhost", () => {
  console.log("listening for request on port 3000");
}); // use listen method to listen to a server via a specified port number
