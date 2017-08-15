const db = require('../db');
const neo4j = require('neo4j-driver').v1;
// react routes that require index.html
exports.react = new Set(['/user', '/projects']);

// request handlers for server routes
exports.api = {
  GET: {
    users: function getUsers() {
      return new Promise((resolve, reject) => {
        console.log('GET users');
        db.runQuery(`MATCH (s:User) RETURN s`)
          .then(res => resolve(res.records.map(user => user._fields[0].properties)))
          .catch(reject);
      });
    },
    projects: function getProjects() {
      return new Promise((resolve) => {
        resolve([
          { projectId: 1,
            project: 'Hello GitBud',
            languages: ['JavaScript', 'HTML', 'CSS'],
            experience: 'beginner',
            userIds: [0, 1, 2],
          },
          { projectId: 2,
            project: 'N-Queens',
            languages: ['JavaScript', 'HTML', 'BackBone'],
            experience: 'Boss mode',
            userIds: [0, 3],
          },
        ]);
      });
    },
    'recommended-pairs': function getProjects() {
      return new Promise((resolve, reject) => {
        console.log('GET users');
        db.runQuery(`MATCH (s:User) RETURN s`)
          .then(res => resolve(
            res.records.map(
              // Please check https://github.com/neo4j/neo4j-javascript-driver#a-note-on-numbers-and-the-integer-type for info on why the below is necessary
              user => Object.assign({}, user._fields[0].properties, { rating: user._fields[0].properties.rating.toNumber() }) // Annoyingly object spread is not supported below node 8.3.0
            )
          ))
          .catch(reject);
      });
    },
  },
};
