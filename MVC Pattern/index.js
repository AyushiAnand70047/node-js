const express = require('express');

const {connectMongoDb} = require('./connection');
const userRouter = require('./routes/user');
const logReqRes = require('./middlewares/index');

const app = express();

// connection
connectMongoDb('mongodb://127.0.0.1:27017/user-app').then(() => console.log("MongoDb Connected")).catch((err) => console.log(err))

// middleware
app.use(express.urlencoded({extended: false}))
app.use(logReqRes("log.txt"));

// routes
app.use('/users',userRouter);

app.listen(8000, () => console.log("Server started"))