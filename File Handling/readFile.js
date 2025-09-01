const fs = require('fs');

const result = fs.readFileSync("./names.txt", "utf-8");
console.log("Read file sync\n", result);

fs.readFile("./names.txt","utf-8",(err,result)=>{
    console.log("Read file async");
    if(err){
        console.log(err);
    } else {
        console.log(result);
    }
})