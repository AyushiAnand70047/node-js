const fs = require('fs');

console.log("1");
// non blocking...
fs.readFile('name.txt','utf-8',(err,result)=>{console.log(result);});
console.log("2");