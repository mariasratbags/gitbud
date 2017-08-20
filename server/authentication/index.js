// Libraries for authentication
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
// GitBud modules
const db = require('../db');

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
        user.avatarUrl = '${profile._json.avatar_url}', user.name = '${profile.displayName}',
        user.rating = 50, user.OAuthToken = '${ accessToken }', user.username = '${profile.username}'
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

module.exports = passport;