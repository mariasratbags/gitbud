const db = require('../db');
const dbDriver = db.driver;
const neo4j = require('neo4j-driver').v1;

// react routes that require index.html
exports.react = new Set(['user', 'projects']);

// request handlers for server routes
exports.api = {
  GET: {
    users: function getUsers() {
      return new Promise((resolve, reject) => {
        const dbSession = dbDriver.session();
        console.log('GET users');
        dbSession.run(`MATCH (u:User) RETURN u`)
          .then((res) => {
            resolve(res.records.map(user => new db.models.User(user.get('u'))));
            dbSession.close();
          })
          .catch((err) => {
            reject(err);
            dbSession.close();
          });
      });
    },
    projects: function getProjects() {
      return new Promise((resolve, reject) => {
        const dbSession = dbDriver.session();
        console.log('GET projects');
        dbSession.run(`MATCH (p:Project) RETURN p`)
          .then((res) => {
            resolve(res.records.map(project => new db.models.Project(project.get('p'))))
            dbSession.close();
          })
          .catch((err) => {
            reject(err);
            dbSession.close();
          });
      });
    },
    'recommended-pairs': function getProjects() {
      const dbSession = dbDriver.session();
      return new Promise((resolve, reject) => {
        console.log('GET users');
        dbSession(`MATCH (s:User) RETURN s`)
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
