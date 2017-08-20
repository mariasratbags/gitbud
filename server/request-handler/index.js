/*
  This module ensures all requests are processed in the correct way.

  Generally, the flow for handling requests is:
    1. Serve static files (server.js)
    2. Serve index.html to React routes
    3. Handle API endpoints
    4. Serve index.html for React to render a 404

  This order should mean that the quickest or simplest
  requests are handled first.

  THINGS TO FIX:
  We really should have used a proper url parser (node has one in the box!) from the beginning.
  
  Our not doing so has led to a great example of pathway dependency. We never found the time to refactor.
  For a great example of the problems this causes, check the incredible kludge of sending GET request info in the
  headers rather than as URL params.
*/

// Node librares
const fs = require('fs');
const path = require('path');
// GitBud module with methods for various endpoints
const routes = require('../routes');

// Cache index.html to serve quickly on React routes and invalid URLs
fs.readFile(path.join(__dirname, '../../dist/index.html'), 'utf8', (err, data) => {
  if (err) {
    throw new Error(err);
  } else {
    exports.index = data;
  }
});

/*
  REACT ROUTES
*/
// Serves index.html on react routes
// and redirects /API request to appropriate endpoint
exports.handler = function handler(req, res) {

  // split URL to send to correct request handler
  const urlParts = req.url.split('/');

  // React routes
  if (routes.react.has(urlParts[1])) {
    res.send(exports.index);

  /*
    API ENDPOINTS
  */
  } else if (urlParts[1] === 'API' && routes.api[req.method].hasOwnProperty(urlParts[2])) {
    // Only send meaningful response to authenticated users
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
    // Unauthenticated users get 403 and empty data
      res.statusCode = 403;
      res.json([]);
    }

  /*
    AUTHENTICATION ENDPOINTS
  */
  // Handle authentication endpoints--these take req and res mostly for our convenience
  // and to make implementation of passport easier.
  // Consider refactoring similar to the above.
  } else if (urlParts[1] === 'auth' && routes.auth[req.method].hasOwnProperty(urlParts[2])) {
    routes.auth[req.method][urlParts[2]](req, res, urlParts);

  /*
    404 NOT FOUND
  */
  // If a request has still not been handled, it is using an incorrect URL.
  // Send index.html -- React will render NotFound component
  } else  {
    res.statusCode = 404;
    res.end(exports.index);
  }
}
