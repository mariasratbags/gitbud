// Allows storing of environment variables
// in .env of root directory.
require('dotenv').config();
// Libraries for handling requests
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// Libraries for authentication and sessions
const session = require('express-session');
// GitBud modules
const passport = require('./server/authentication').passport;
const requestHandler = require('./server/request-handler');
const db = require('./server/db');

// Make express server
const app = express();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// Save sessions
// NOTE: This is using a bad memory store
// https://www.npmjs.com/package/express-session#sessionoptions
app.use(session({
  secret: 'This is a secret',
  resave: false,
  saveUninitialized: true,
}));

// Set server to use initialized passport from authentication module
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));
// All other enpoints routed in request-handler module
app.use(bodyParser.json());
app.use(requestHandler.handler);
