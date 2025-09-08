const { getUser } = require('../service/auth');

function restrictToLoggedinUserOnly(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const user = getUser(token); // verify token
        req.user = user; // attach user to request
        next();
    } catch (err) {
        // token invalid or expired
        return res.redirect('/login');
    }
}

module.exports = restrictToLoggedinUserOnly;
