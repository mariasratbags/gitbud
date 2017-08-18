const forEach = require('lodash/forEach');
const axios = require('axios');

module.exports = function getRepoStats({ OAuthToken, username, repos, profile }) {
  const httpQueries = [];
  let repoStats = 0;
  let i;
  forEach(repos, (repo) => {
    const multiplier = repo.forks_count + repo.stargazers_count + repo.watchers_count;
    httpQueries.push(
      axios.get(`https://api.github.com/repos/${ username }/${ repo.name }/commits`, {
        params: {
          access_token: OAuthToken,
          author: username,
        }
      })
        .then((res) => {
          const commits = res.data;
          forEach(commits, (commit) => {
            httpQueries.push(axios.get(`https://api.github.com/repos/${ username }/${ repo.name }/commits/${ commit.sha }`, {
              params: {
                author: username,
                access_token: OAuthToken,
              }
            })
              .then((res) => {
                repoStats += (multiplier || 1) * res.data.stats.total;
              })
            )
          })
        })
        .catch((err) => {
          if (err.response.status === 404) {
            // GitHub's API sometimes returns out of date information
            // or implies personal repos when the user is a member of a team one.
            // We just skip these.
            return;
          }
          console.error('GH API err:', err);
        })
    );
  });
  return Promise.all(httpQueries)
    .then(() => {
      profile.repoStats = repoStats;
      return { OAuthToken, username, repos, profile };
    });
};