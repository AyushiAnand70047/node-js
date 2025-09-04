const express = require("express");

const app = express();

app.get("/", (req,res)=>{
    console.log(req.headers);
    res.setHeader("X-myName", "Ayushi");
    return res.send("Home Page");
})

app.listen(8000, () => console.log("Server started"));