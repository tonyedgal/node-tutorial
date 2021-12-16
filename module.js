// const foo = require("./people"); // this runs the code in the people.js file
const { a, b } = require("./people"); // accessing the properties of the exported objct via destructuring

console.log(a, b); // this logs an empty object in the console if people.js is not exported

const os = require("os");

console.log(os.platform(), os.homedir());
