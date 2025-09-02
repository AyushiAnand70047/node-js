const http = require('http');
const url = require('url');

const myServer = http.createServer((req,res) => {

    // if(req.url === '/favicon.ico'){ return res.end()};

    const myUrl = url.parse(req.url, true);

    switch(myUrl.pathname) {
        case "/":
            res.end("Home Page");
            break;
        case "/about":
            const username = myUrl.query.fname + " " + myUrl.query.lname;
            res.end(`Hii, ${username}`);
            break;
        default:
            res.end("404 Not Found");
    }
})

myServer.listen(8000, () => {console.log('Server started')});