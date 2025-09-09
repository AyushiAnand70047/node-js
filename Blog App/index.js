const express = require('express');
const path = require('path');
const userRoute = require('./routes/user.router');
const connectToMongoDB = require('./connection');

const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://127.0.0.1:27017/blogify');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended: false}));

app.get('/', (req,res)=> res.render('home'));
app.use('/user', userRoute);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));