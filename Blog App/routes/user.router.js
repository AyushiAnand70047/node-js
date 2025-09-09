const {Router} = require('express');
const {createHmac} = require("crypto");
const {User} = require('../models/user.model')
const router = Router();

router.get('/signin', (req,res) => {
    return res.render("signin");
})

router.get('/signup', (req,res) => {
    return res.render("signup");
})

router.post('/signup', async (req,res) => {
    const {fullName, email, password} = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect('home');
})

router.post('/signin', async (req,res) => {
    const {email, password} = req.body;

    const user = await User.matchPassword(email, password);

    console.log(user);

    // if(hashedPassword == user.password){
    //     return res.redirect('/home');
    // }

    return res.status(400).send("Invalid credentials");
})

module.exports = router;