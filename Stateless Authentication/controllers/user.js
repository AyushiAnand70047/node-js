const User = require('../models/user');
const {setUser} = require('../service/auth');

async function handleUserSignup(req,res) {
    const {name, email, password} = req.body;
    await User.create({name, email, password});
    res.redirect('/login');
}

async function handleUserLogin(req,res) {
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user){
        return res.render("login",{
            error: "Invalid Username or Password",
        })
    }
    const token = setUser(user.toObject());
    // res.cookie("token", token);
    // res.redirect('/home');
    return res.json({token});
}

module.exports = {handleUserSignup, handleUserLogin}