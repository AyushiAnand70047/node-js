const mongoose = require('mongoose');

function connectToMongoDB(url){
    mongoose.connect(url)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log("Error in connecting with MongoDB", error));
}

module.exports = connectToMongoDB;