const express = require('express');
const fs = require('fs');
const zlib = require('zlib');
const status = require('express-status-monitor');

const app = express();
const PORT = 8000;

app.use(status());

fs.createReadStream('./sample.txt').pipe(
    zlib.createGzip().pipe(fs.createWriteStream('./sample.zip'))
);

app.get("/", (req,res) => {

    // for large file(content) readFile on window load consume lot of memory as whole data is added in rensponse at once, so we use stream which send data in chunk.

   const stream = fs.createReadStream("./sample.txt", "utf-8");
   stream.on('data', (chunk) => res.write(chunk));
   stream.on('end', () => res.end());

    // fs.readFile('./sample.txt', (err,data) => {
    //     res.end(data);
    // })
})

app.listen(PORT, () => console.log("Server Started"))