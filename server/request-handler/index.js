const fs = require('fs');
const path = require('path');
const routes = require('../routes');

// cache index.html to serve on React routes
fs.readFile(path.join(__dirname, '../../dist/index.html'), 'utf8', (err, data) => {
  if (err) {
    throw new Error(err);
  } else {
    exports.index = data;
  }
});

// serves index.html on react routes
// and redirects /API request to appropriate endpoint
exports.handler = function handler(req, res) {

  // react routes
  if (routes.react.has(req.url)) {
    res.send(exports.index);
  }

  // API endpoints
  const urlParts = req.url.split('/');
  if (urlParts[1] === 'API' &&
    routes.api[urlParts[2]].hasOwnProperty(req.method)) {
    routes.api[urlParts[2]][req.method](req)
      .then((data) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.send(data);
      })
      .catch((err) => {
        console.error(err);
        res.end('sorry not sorry');
      });
  }
}
