const db = require('../db');
const axios = require('axios');
const _map = require('lodash/map');
const getLanguages = require('./languages');

exports.getUserRepos = function getUserRepos(ghId) {
  var OAuthToken;
  const dbSession = db.driver.session();
  return dbSession.run(`
    MATCH (user:User {ghId: ${ ghId }}) RETURN user
  `)
    .then((res) => {
      OAuthToken = new db.models.User(res.records[0].get('user')).OAuthToken;
      return axios.get('https://api.github.com/user/repos', {
        params: {
          access_token: OAuthToken,
        }
      })
    })
    .then(res =>
      ({ OAuthToken, repos: _map(res.data, ({ name, owner, languages_url }) => 
        ({ name, owner: owner.login, languages_url }))
      })
    );
};

exports.displayUserLanguages = function gl(ghId) {
  exports.getUserRepos(ghId)
    .then(getLanguages.getUserLanguages)
    .then(console.log);
}