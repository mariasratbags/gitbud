const express = require('express');
const path = require('path');
const requestHandler = require('./server/request-handler');

// make express server
app = express();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// serve static files and user routes
app.use(express.static(path.join(__dirname, 'dist')));

app.use(requestHandler.handler);


