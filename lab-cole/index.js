'use strict';


require('dotenv').config();

const server = require("./lib/server");

server.listen(3000, () => {
    console.log('Server up at 3000')
});