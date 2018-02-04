'use strict'

const http = require('http');
const cowsay = require('cowsay');
const requestParser = require('./request-parser.js');


const app = http.createServer((req, res) => {
  requestParser(req)
  .then(req => {
    if(req.method === 'GET' && req.url.pathname === '/'){
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(`<!DOCTYPE html>
      <!DOCTYPE html>
      <html>
        <head> 
          <title> cowsay </title> 
        </head>
        <body>
          <header>
            <nav>
              <ul>
                <li><a href="/cowsay"> cowsay </a><li>
              </ul>
            </nav>
          <header>
          <main>
            <!-- project description -->
          </main>
        </body>
      </html>`);
      res.end();
      return;
    }

    if(req.method === 'POST' && req.url.pathname === '/api/cowsay'){
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.write(JSON.stringify(req.body))
      res.end()
      return;
    }

    res.writeHead(404, {
      'Content-Type': 'text/plain'
    })
    res.write(`resource ${req.url.pathname} not found!`)
    res.end();
  })
  .catch(err => {
    console.log(err)
    res.writeHead(400, { 
      'Content-Type': 'text/plain' 
    })
    res.write('bad request')
    res.end()
  })
})

// export interface
module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
}