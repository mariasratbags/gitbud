/*
Organize files as separate modules
Have a file for routes
Have a file for helper functions
For stage 0, return hello world to client on '/' GET request
Serve dummy user data to user endpoints
Serve static files from dist
*/
const express = require('express');
const path = require('path');

// make express server
const app = express();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// serve static files and hello world
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
  res.send('hello world');
});
