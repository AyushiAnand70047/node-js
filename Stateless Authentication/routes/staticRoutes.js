const express = require('express');
const router = express.Router();
const restrictToLoggedinUserOnly = require('../middleware/user');

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/home',restrictToLoggedinUserOnly, (req, res) => {
    res.render('home', { user: req.user });
});

module.exports = router;