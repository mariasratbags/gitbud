const db = require('../db');
const dbDriver = db.driver;
const neo4j = require('neo4j-driver').v1;

// react routes that require index.html
exports.react = new Set(['user', 'projects']);

// request handlers for server routes
exports.api = {
  GET: {
    users: function getUsers(req) {
      return new Promise((resolve, reject) => {
        const dbSession = dbDriver.session();
        console.log('GET users');
        dbSession.run(`
          MATCH (user:User)-[:INTERESTED_IN]-(project:Project)
          WHERE ID(project) = ${Number(req.headers.id)}
          RETURN user
        `)
          .then((res) => {
              resolve(res.records.map(user => new db.models.User(user.get('user'))))
          })
          .catch(reject)
          .then(() => dbSession.close());
      });
    },
    projects: function getProjects() {
      return new Promise((resolve, reject) => {
        const dbSession = dbDriver.session();
        console.log('GET projects');
        dbSession.run(`MATCH (project:Project) RETURN project`)
          .then((res) => {
            resolve(res.records.map(project => new db.models.Project(project.get('project'))))
          })
          .catch(reject)
          .then(() => dbSession.close());
      });
    },
  },
  POST: {
    projects: function projects(req) {
      return new Promise((resolve, reject) => {
        const dbSession = dbDriver.session();
        console.log('POST projects');
        dbSession.run(
          `
          MATCH (user:User) WHERE user.ghId=${Number(req.user.ghInfo.id)}
          MATCH (project:Project) WHERE ID(project) = ${Number(req.body.id)}
          MERGE (user)-[:INTERESTED_IN]->(project)
          return user, project
          `
        )
          .then((res) => {
            resolve(res);
          })
          .catch(reject)
          .then(() => dbSession.close());
      });
    }
  },
  pair: function addPair(req) {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        const dbSession = dbDriver.session();
        console.log('POST pair');
        dbSession.run(
          `
          MATCH (project:Project) WHERE ID(project) = ${Number(req.body.project)}
          MATCH (user:User) WHERE user.ghId=${Number(req.user.ghInfo.id)}
          MATCH (pair:User) WHERE pair.ghId=${Number(req.body.partnered)}
          CREATE (group:Group)
          MERGE
            (user)-[:PAIRED_WITH]->(group),
            (pair)-[:PAIRED_WITH]->(group),
            (group)-[:WORKING_ON]->(project)
          return user, pair, group, project
          `
        )
          .then((res) => {
            console.log(res);
            resolve(res);
          })
          .catch(reject)
          .then(() => dbSession.close());
      });
  }
};

exports.auth = {
  GET: {
    signout: function signout(req, res) {
      // destroy session and redirect to home
      req.logout();
      res.redirect('/');
    },
    authenticated: function checkAuthenticated(req, res) {
      // Confirm if user signed in
      res.send(req.isAuthenticated());
    },
    // Currently server handling--possibly review
    // github: function callback(req, res, urlParts) {
    //   // upon successful authentication, redirect to projects
    //   if (urlParts[3] === 'callback') {
    //     res.redirect('/projects');
    //   } else {
    //     res.statusCode = 400;
    //     res.send('Invalid request');
    //   }
    // }
  }
}