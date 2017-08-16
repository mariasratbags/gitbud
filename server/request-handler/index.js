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
  // split URL to send to correct request handler
  const urlParts = req.url.split('/');
  console.log(req.url);

  // react routes
  if (routes.react.has(urlParts[1])) {
    console.log('index sent: ', req.url)
    res.send(exports.index);
  // API endpoints
  } else if (urlParts[1] === 'API' && routes.api[req.method].hasOwnProperty(urlParts[2])) {
    if (req.isAuthenticated()) {
      routes.api[req.method][urlParts[2]](req)
        .then((data) => {
          res.statusCode = 200;
          res.json(data);
        })
        .catch((err) => {
          console.error(err);
          res.end('sorry not sorry');
        });
    } else {
      res.statusCode = 403;
      res.json([]);
    }
  // else -- incorrect path -- React will render NotFound component
  } else {
    res.statusCode = 404;
    res.end(exports.index);
  }
}
