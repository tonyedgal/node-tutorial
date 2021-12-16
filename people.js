const people = ["a", "b", "c", "d", "e"];
const ages = [1, 2, 3, 4, 5];

console.log(people);

module.exports = {
  a: people,
  b: ages,
}; // how to export to the other file, what you set as the value of the export is what gets logged to the console
