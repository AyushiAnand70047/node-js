const {validateToken} = require('../services/auth');

function checkForAuthenticationCookie(cookieName){
    return function (req, res, next) {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) {
            req.user = null;
            return next();
        }
        
        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch(error) {
            req.user = null;
        }
        res.locals.userName = req.cookies.userName || null;
        return next();
    }
}

module.exports = {checkForAuthenticationCookie};