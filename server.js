/*
[x] Organize files as separate modules
[x] Have a file for routes
[ ] Have a file for helper functions
[x] For stage 0, return hello world to client on '/' GET request
[x] Serve dummy user data to user endpoints
[x] Serve static files from dist
*/
const express = require('express');
const path = require('path');
const routes = require('./server/routes');

// make express server
const app = express();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// serve static files and hello world
app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res) => {
  console.log(req.url);
  routes[req.method][req.url](req)
    .then(res.send);
});
