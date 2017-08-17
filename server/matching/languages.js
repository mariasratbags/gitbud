const axios = require('axios');
const _map = require('lodash/map');
const _forEach = require('lodash/forEach');

exports.getUserLanguages = function getUserLanguages({ OAuthToken, repos }) {
  const languageQueries = _map(repos, (repo) => {
    return axios.get(repo.languages_url, {
      params: {
        access_token: OAuthToken
      }
    });
  });
  return Promise.all(languageQueries)
    .then((responses) => {
      const languages = {};
      _forEach(responses, (res) => {
        for (var i = 0, keys = Object.keys(res.data), n = keys.length; i < n; i++) {
          languages[keys[i]] = res.data[keys[i]] + (languages[keys[i]] || 0);
        }
      });
      return languages;
    })
};
