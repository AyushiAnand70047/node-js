const express = require('express');

const app = express();

app.use((req,res,next) => {
    console.log("Hello from middleware 1")
    next();
})

app.use((req,res,next) => {
    console.log("Hello from middleware 2")
    res.end("Hey");
})

app.get('/', (req,res) => {
    res.send("Home Page");
})

app.listen(8000, () => console.log('server started'));