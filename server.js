const express = require('express');
const path = require('path');
const routes = require('./server/routes').routes;

// make express server
const app = express();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// serve static files and user routes
app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res) => {
  console.log(req.url);
  routes[req.method][req.url]()
    .then(data => res.send(data))
    .catch(console.error);
});
