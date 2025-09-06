const express = require("express");
const path = require('path');
const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter.js');
const URL = require('./models/url.js');
const connectToMongoDB = require('./connection.js');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}))

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener')
.then(() => console.log("MongoDb connected"));
app.use('/url', urlRoute);
app.use('/', staticRouter);

app.get('/:id', async (req,res) => {
    const shortId = req.params.id;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push: {
        visitHistory: {
            timestamp: Date.now()
        }
    }})
    res.redirect(entry.redirectURL);
})

app.listen(8000, () => console.log("Server started"))