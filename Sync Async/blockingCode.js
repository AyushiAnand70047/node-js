const fs = require('fs');

console.log("1");
// blocking...
const result = fs.readFileSync('name.txt','utf-8');
console.log(result);
console.log("2");