const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req,res) => {
    const log = `${new Date()}: ${req.url} Request recieved\n`;
    fs.appendFile('logs.txt',log, (err) => {})
    res.end("Hello from server");
})

myServer.listen(8000, () => {console.log("Server started")});