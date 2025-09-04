const User = require('../models/user');

async function handleGetAllUsers(req, res) {
    const all_users = await User.find({});
    res.json(all_users);
}

async function handleCreateUser(req,res) {
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
}

async function handlegetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if(user){
        return res.send(user);
    }
}

async function handleUpdateUserById(req, res) {
    const data = req.body;
    await User.findByIdAndUpdate(req.params.id, data)
    return res.json({status: 'Success'});
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handlegetUserById,
    handleUpdateUserById,
    handleDeleteUserById
}