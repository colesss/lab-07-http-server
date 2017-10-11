'use strict';

const url = require('url');
const queryString = require('queryString');


//class demo, working on adding cowsay requirements with these guidelines
let parser = module.exports = {};

parser.execute = (req) => {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    return;
};