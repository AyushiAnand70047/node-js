const fs = require('fs');

console.log(fs.statSync("./names.txt"));

// is it a file?
console.log(fs.statSync("./names.txt").isFile());