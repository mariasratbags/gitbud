/*
 *  REPO STATS
 *  (Invoked from /server/profiling/index.js)
 *
 *  This module simply tots up all the repo stats and adds them to the profile.
 *
 *  It doesn't do anything clever or special, but it certainly could with more information
 *  from GitHub (tips about using graphQL in profilin/index.js).
 *
 */

module.exports = function getRepoStats({ OAuthToken, username, repos, profile }) {
  let repoStats = 0;
  for (let i = 0; i < repos.length; i++) {
    repoStats += repos[i].forks_count
      + repos[i].stargazers_count
      + repos[i].watchers_count;
  }
  profile.repoStats = repoStats;
  return { OAuthToken, username, repos, profile };
};
