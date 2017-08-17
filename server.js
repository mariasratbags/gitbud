require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const requestHandler = require('./server/request-handler');
const db = require('./server/db');

// make express server
const app = express();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

app.use(bodyParser.json());

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');

// temporary clientID and clientSecret for dev purposes
// https://github.com/organizations/cranebaes/settings/applications/574129
passport.use(new GitHubStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    const dbSession = db.driver.session();
    dbSession.run(`
      MERGE
        (user:User { ghId: ${profile._json.id} })
      SET 
        user.avatarUrl = '${profile._json.avatar_url}', user.name = '${profile.displayName}', user.rating = 50, user.OAuthToken = '${ accessToken }'
    `)
      .then(() => dbSession.close())
      .catch((err) => {
        console.error(err);
        dbSession.close();
      });
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
app.get('/auth/github', passport.authenticate('github', { scope: ['user', 'repo'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    // upon successful authentication, redirect to projects
    res.redirect('/projects');
  }
);

// serve static files and user routes
app.use(express.static(path.join(__dirname, 'dist')));

app.use(requestHandler.handler);
