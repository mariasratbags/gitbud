const db = require('../db');
const axios = require('axios');

exports.getUserRepos = function getUserRepos(ghId) {
  const dbSession = db.driver.session();
  dbSession.run(`
    MATCH (user:User {ghId: ${ ghId }}) RETURN user
  `)
    .then((res) => {
      const { OAuthToken } = new db.models.User(res.records[0].get('user'));
      return axios.get('https://api.github.com/user/repos', {
        params: {
          access_token: OAuthToken
        }
      });
    })
    .then((res) => {
      const repos = res.data.map(({ name, owner }) => ({ name, owner: owner.login }));
    });
};