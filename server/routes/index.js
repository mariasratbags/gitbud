const db = require('../db');
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
          .then(res => resolve(res.records.map(user => user._fields[0].properties)))
          .catch(reject);
      });
    },
  },
};
