const express = require("express");
const urlRoute = require('./routes/url');
const URL = require('./models/url.js');
const connectToMongoDB = require('./connection.js');
const app = express();

app.use(express.json());

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener')
.then(() => console.log("MongoDb connected"));
app.use('/url', urlRoute);

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