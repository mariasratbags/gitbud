// Libraries
const axios = require('axios');

// lodash functions
const map = require('lodash/map');
const forEach = require('lodash/forEach');
const filter = require('lodash/filter');

// Other server modules
const db = require('../db');
const getLanguages = require('./languages');

// Gets all repos that a user either created or has committed to
exports.getUserRepos = function getUserRepos(ghId) {
  // First get user info from the db
  const dbSession = db.driver.session();
  return dbSession.run(`
    MATCH (user:User {ghId: ${ ghId }}) RETURN user
  `)
    .then((res) => {
      // Then use that info to get the users repos from GitHub
      const { OAuthToken, username } = new db.models.User(res.records[0].get('user'));
      return axios.get('https://api.github.com/user/repos', {
        params: {
          access_token: OAuthToken,
          per_page: 100,
        }
      })
        .then(res => ({ OAuthToken, username, res }));
    })
    .then(({OAuthToken, username, res}) =>
      // Then extract the useful information from those repos
      // Here we're interested in the owner, name, whether it's forked and the url for its language stats
      ({
        OAuthToken,
        username,
        repos: map(res.data, ({ name, owner, languages_url, fork }) => 
          ({ name, owner: owner.login, languages_url, fork }))
      })
    )
    .then(({ username, OAuthToken, repos }) => {
      // Then check if they're forks. If so, find out whether or not the user has actually committed to that repo.
      const commitPromises = [];
      forEach(repos, (repo) => {
        if (repo.fork) {
          // It's a fork. so qury for commits
          commitPromises.push(axios.get(`https://api.github.com/repos/${ username }/${ repo.name }/commits`, {
            params: {
              access_token: OAuthToken,
              author: username,
            },
          })
            .then((res) => {
              // Check for commits
              repo.include = res.data.length > 0;
            })
          );
        } else {
          // Not a fork.
          repo.include = true;
        }
      });
      return Promise.all(commitPromises)
        .then(() => ({ username, OAuthToken, repos }));
    })
    .then(({ OAuthToken, username, repos }) => 
      // Finally filter by the include property
      ({
        OAuthToken,
        username,
        repos: filter(repos, repo => repo.include),
      })
    );
};

// This is a testing function which uses the above chain
// and one from the languages module to show a user's most-used languages
exports.displayUserLanguages = function gl(ghId) {
  exports.getUserRepos(ghId)
    .then(getLanguages.getUserLanguages)
    .then(console.log);
}