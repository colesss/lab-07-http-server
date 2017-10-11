'use strict';

const http = require('http');
const cowsay = require('cowsay'); //need to get this dependancy...
const requestParser = require("./parse-request");
const bodyParser = require("./parse-body");


//class demo, working on adding cowsay requirements with these guidelines
const app = http.createServer( (req, res) => {
    requestParser.execute(req);

    console.log("Status", req.statusCode);
    console.log("Headers", req.headers);
    console.log("Method", req.method);
    console.log("URL", req.url);

    if ( req.method === "GET" && req.url.pathname === "/" ) {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = "OK";
        res.write(`Welcome, ${Math.random()}`);
        res.end();
        return;
    }
    
    else if ( req.method === "POST" && req.url.pathname === "/json") {
        bodyParser.execute(req)
            .then( (req) => {
                res.setHeader('Content-Type', 'text/json');
                res.statusCode = 200;
                res.statusMessage = "OK";
                res.write( JSON.stringify(req.body) );
                res.end();
                return;
            })
            .catch( (err) => {
                let errObject = { error:err };
                console.log(err);
                res.setHeader('Content-Type', 'text/json');
                res.statusCode = 400;
                res.statusMessage = "Bad Request";
                res.write( JSON.stringify(errObject) );
                res.end();
                return;
            });
    }

    else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.statusMessage = "Resource not Found";
        res.write("<h1>Resource Not Found</h1>");
        res.end();
        return;
    }
});

modules.exports = {
    start: (port, callback) => app.listen(port, callback),
    stop: (callback) => app.close(callback)
}