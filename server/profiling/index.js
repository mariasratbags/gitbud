/*
 *  PROFILING
 * 
 *  This module attempts to build profile users by experience
 *  by scraping info from GitHub's API.
 * 
 *  This profile is saved as JSON on the user's node in the db and
 *  used to compare users by finding the absolute difference
 *  between their relative experience.
 * 
 *  There's a lot of room to add features here, as GitHub's API
 *  is very generous with information. It is less generous, however,
 *  with allowances: we added some very cool features but quickly found
 *  that doing all the necessary API queries was blasting our rate limit.
 * 
 *  NOTES:
 *  --lodash
 *  lodash functions are used here, as there's an awful lot of repeated
 *  iteration over arrays, and for that lodash is generally the fastest.
 * 
 *  --Style
 *  This is generally written (with some notable exceptions--e.g. the mutation of profile)
 *  in quite a functional style. This is to make it easier to add new functionality into
 *  the chain.
 * 
 *  Each function takes some information does some processing and returns new information
 *  for the next function. We'd advise you stick with this layout, but you may wish to change
 *  the object destructuring simply to positional parameters. We used it as a convenience,
 *  allowing us to add features and information (and also drop them) quickly, without
 *  worrying about how other function's might view those changes.
 */

// Other server modules
const db = require('../db');
// Other profiling modules
const getUserLanguages = require('./languages');
const getUserRepoStats = require('./repoStats');
const getUserRepos = require('./repos');
exports.compareUser = require('./matching');

// Takes a profile and saves it to the db
const saveUserProfile = function saveUserProfile({ username, OAuthToken, repos, profile }) {
  const dbSession = db.driver.session();
  return dbSession.run(`
    MATCH (user:User {OAuthToken: '${OAuthToken}'})
    SET user.profile = '${JSON.stringify(profile).replace('\'', '\\\'')}'
  `)
    .then(() => {
      dbSession.close();
      return { username, OAuthToken, repos, profile }
    })
    .catch(console.error);
};

// This function chains together all the separate profiling functionality
// to create a user profile and save it to their node on the db.
exports.buildUserProfile = function buildUserProfile(ghId) {
  return getUserRepos(ghId)
    .then(getUserLanguages)
    .then(getUserRepoStats)
    .then(saveUserProfile)
    .catch(console.error);
};
