const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({extended: false}))

// connect with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/user-app')
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("Mongo Error",err);
    })

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    job_title: {
        type: String,
    },
}, { timestamps: true }
);

// Model
const User = mongoose.model('User', userSchema);

app.get('/users', async (req,res)=>{
    const all_users = await User.find({});
    res.json(all_users);
})

app.post('/users', async (req,res) => {
    const data = req.body;
    if(!data.firstName || !data.lastName || !data.email || !data.gender || !data.job_title){
        res.send("All fields are required");
    }

    const user = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        job_title: data.job_title,
    })

    return res.status(201).json({msg: "User created"});
});

app.get('/users/:id',async (req,res) => {
    const user = await User.findById(req.params.id);
    if(user){
        res.send(user);
    }
})

app.patch('/users/:id', async (req,res) => {
    const data = req.body;
    await User.findByIdAndUpdate(req.params.id, data)
    return res.send('hey')
})

app.delete('/users/:id',async (req,res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "success"});
})

app.listen(8000, () => console.log("Server started"));