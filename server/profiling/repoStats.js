module.exports = function getRepoStats({ OAuthToken, username, repos, profile }) {
  let repoStats = 0;
  let i;
  for (i = 0, n = repos.length; i < n; i++) {
    repoStats += repos[i].forks_count 
      + repos[i].stargazers_count
      + repos[i].watchers_count;
  }
  profile.repoStats = repoStats;
  return { OAuthToken, username, repos, profile };
};