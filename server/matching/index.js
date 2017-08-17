const db = require('../db');
const axios = require('axios');

exports.getUserRepos = function getUserRepos(ghId) {
  var OAuthToken;
  const languages = {};
  const dbSession = db.driver.session();
  dbSession.run(`
    MATCH (user:User {ghId: ${ ghId }}) RETURN user
  `)
    .then((res) => {
      OAuthToken = new db.models.User(res.records[0].get('user')).OAuthToken;
      return axios.get('https://api.github.com/user/repos', {
        params: {
          access_token: OAuthToken
        }
      });
    })
    .then((res) => {
      const repos = res.data.map(({ name, owner, languages_url }) => ({ name, owner: owner.login, languages_url }));
      const languageQueries = repos.map((repo) => {
        return axios.get(repo.languages_url, {
          params: {
            access_token: OAuthToken
          }
        });
      });
      Promise.all(languageQueries)
        .then(responses => responses.forEach((res) => {
          for (var i = 0, keys = Object.keys(res.data), n = keys.length; i < n; i++) {
            languages[keys[i]] = res.data[keys[i]] + (languages[keys[i]] || 0);
          }
        })).then(() => console.log(languages));
    });
};