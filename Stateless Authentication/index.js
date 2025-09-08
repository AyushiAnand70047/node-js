const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectToMongoDb = require('./connection');
const staticRoute = require('./routes/staticRoutes');
const userRoute = require('./routes/userRoutes');
const restrictToLoggedinUserOnly = require('./middleware/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

connectToMongoDb('mongodb://127.0.0.1:27017/users');

app.use('/', staticRoute);
app.use('/user', userRoute);

app.listen(8001, () => console.log('server started'));