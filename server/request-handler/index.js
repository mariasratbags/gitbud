const express = require('express');
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

exports.handler = function handler(req, res) {
  console.log('handling url: ', req.url);
  if (routes.react.has(req.url)) {
    console.log('serving react route: ', req.url);
    res.send(exports.index);
  }

  var urlParts = req.url.split('/');
  console.log('url parts line 25', urlParts);
  // /api/user
  if (urlParts[1] === 'API' && routes.api[req.method].hasOwnProperty(urlParts[2])) {
    console.log('serving api endpoint', urlParts);
      routes.api[req.method][urlParts[2]](req)
        .then(data => res.send(data))
        .catch(err => {
          console.error(err);
          res.end('sorry not sorry');
        });
  }
}
