const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const  {checkForAuthenticationCookie} = require('./middleware/authentication')
const userRoute = require('./routes/user.router');
const blogRoute = require('./routes/blog.router');
const connectToMongoDB = require('./connection');
const Blog = require('./models/blog.model');
const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://127.0.0.1:27017/blogify');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')))

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", { user: req.user, blogs: allBlogs });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));