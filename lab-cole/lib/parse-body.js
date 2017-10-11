'use strict';


//class demo, working on adding cowsay requirements with these guidelines
let bodyParser = module.exports = {};

bodyParser.execute = (req) => {
    return new Promise( (resolve, reject) => {
        let text = '';

        req.on("data", (buffer) => {
            text += buffer.toString();
        });

        req.on("end", () => {
            try {
                req.body = JSON.parse(text);
                resolve(req);
            }
            catch(err) {
                reject(err);
            }
        });
    });
};