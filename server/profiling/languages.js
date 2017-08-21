// Libraries
const axios = require('axios');
const map = require('lodash/map');
const forEach = require('lodash/forEach');

// Takes an object with a username OAuth token and array of repos from the matching module
module.exports = function getUserLanguages({ OAuthToken, username, repos, profile }) {
  // First pack an array with the Promises of queries for each repo
  const languageQueries = map(repos, (repo) => {
    return axios.get(repo.languages_url, {
      params: {
        access_token: OAuthToken
      }
    });
  });
  // Then wait for all queries to resolve and total language stats
  return Promise.all(languageQueries)
    .then((responses) => {
      const languages = {};
      forEach(responses, (res) => {
        for (var i = 0, keys = Object.keys(res.data), n = keys.length; i < n; i++) {
          languages[keys[i]] = res.data[keys[i]] + (languages[keys[i]] || 0);
        }
      });
      forEach(Object.keys(languages), key =>
        languages[key] = Math.log2(languages[key])
      );
      profile.languages = languages;
      return { OAuthToken, username, repos, profile };
    })
};
