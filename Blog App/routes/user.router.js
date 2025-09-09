const { Router } = require('express');
const User = require('../models/user.model')
const router = Router();

router.get('/signin', (req, res) => {
    return res.render("signin");
})

router.get('/signup', (req, res) => {
    return res.render("signup");
})

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect('signin');
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        const user = await User.findOne({ email });
        res.cookie("token", token, { httpOnly: true });
        res.cookie("userName", user.fullName); 
        return res.redirect("/");
    } catch (error) { 
        return res.render('signin', {
            error: "Incorrect email or password"
        })
    }
})

router.get('/logout', (req,res) => {
    res.clearCookie("token")
    res.clearCookie("userName")
    return res.redirect('/');
})

module.exports = router;