const name = "maro";

console.log(name);

const greet = (me) => {
  console.log(`fuck, ${me}`);
};

greet("maro");

setTimeout(() => {
  console.log("object");
  clearInterval(int);
}, 5000);

const int = setInterval(() => {
  console.log("me");
}, 1000);

console.log(__dirname);
console.log(__filename);
