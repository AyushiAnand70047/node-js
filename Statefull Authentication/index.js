const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectToMongoDb = require('./connection');
const restrictToLoggedinUserOnly = require('./middlewares/auth');
const userRoute = require('./routes/user')
const staticRoute = require('./routes/staticRouter');
const urlRoute = require('./routes/url');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

connectToMongoDb('mongodb://127.0.0.1:27017/users').then(() => console.log("MongoDb connected"));

app.use('/url', restrictToLoggedinUserOnly, urlRoute);
app.use('/user',userRoute);
app.use('/',staticRoute);

app.listen(8000, () => {console.log('Server started')});