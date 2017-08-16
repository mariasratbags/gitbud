const express = require('express');
const path = require('path');
const requestHandler = require('./server/request-handler');
const db = require('./server/db');

// make express server
const app = express();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');

// temporary clientID and clientSecret for dev purposes
// https://github.com/organizations/cranebaes/settings/applications/574129
passport.use(new GitHubStrategy(
  {
    clientID: '7ee693d863722e629a0d',
    clientSecret: 'bb125559a339291da94647972c31fe1da93969e1',
    callbackURL: process.env.CALLBACK_URL || 'http://localhost:8080/auth/github/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    const dbSession = db.driver.session();
    dbSession.run(`
      MERGE (:User {username: '${profile.username}', ghId: ${profile._json.id},
      avatarUrl: '${profile._json.avatar_url}', name: '${profile.displayName}', rating: 50}) 
    `)
      .then(() => dbSession.close())
    console.log('strategy', profile);
    return done(null, profile);
  }
));

// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  const userInfo = {
    displayName: user.displayName,
    username: user.username,
    profileUrl: user.profileUrl,
    ghInfo: user._json
  }
  done(null, userInfo);
});

app.use(session({
  secret: 'This is a secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// specify github strategy to authenticate request
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    // upon successful authentication, redirect to projects
    res.redirect('/projects');
  });

// destroy session and redirect to home
app.get('/auth/signout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// user check if signed in
app.get('/auth/authenticated', (req, res) => {
  res.send(req.isAuthenticated());
});

// serve static files and user routes
app.use(express.static(path.join(__dirname, 'dist')));

app.use(requestHandler.handler);
