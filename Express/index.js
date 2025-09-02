const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send("Hello from home page");
})

app.get('/about', (req,res) => {
    return res.send(`Hey, ${req.query.fname} ${req.query.lname}`);
})

app.listen(8000, () => console.log("server started"));