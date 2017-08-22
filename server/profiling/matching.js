// Libraries
const forEach = require('lodash/forEach');
const map = require('lodash/map');
const union = require('lodash/union');
// GitBud modules
const db = require('../db');

module.exports = function compareUser(dbSession, ghId) {
  return dbSession.run(`
    MATCH (user:User {ghId: ${ghId}})
    RETURN user
    UNION
    MATCH (user:User) WHERE NOT user.ghId = ${ghId}
    RETURN user
  `)
    .then((res) => {
      // Get current user and other users, and create object to store comparisons
      const user = new db.models.ServerUser(res.records[0].get('user'));
      const comparators = map(res.records.slice(1), record => new db.models.ServerUser(record.get('user')));
      const comparisons = {};
      // Compare against every other user
      forEach(comparators, (comparator) => {
        let difference = Math.pow(comparator.profile.repoStats - user.profile.repoStats, 2);
        const languages = union(Object.keys(user.profile.languages), Object.keys(comparator.profile.languages));
        forEach(languages, (language) => {
          difference += Math.pow((user.profile.languages[language] || 0) - (comparator.profile.languages[language] || 0), 2);
        });
        comparisons[comparator.ghId] = Math.round(Math.sqrt(difference));
      });
      // Save comparisons in db as relationships
      return dbSession.run(`
        MATCH (user:User {ghId: ${user.ghId}})
        ${ 
          map(comparators, comparator => `
            WITH user
            MATCH (comparator:User {ghId: ${comparator.ghId}})
            MERGE (user)-[:EXPERIENCE_DIFFERENCE {difference: ${comparisons[comparator.ghId]}}]->(comparator)
          `)
          .join('\n')
        }
      `)
        .then((res) => {
          dbSession.close();
          return res;
        })
    });
};
