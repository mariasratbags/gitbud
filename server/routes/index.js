const db = require('../db');
const dbDriver = db.driver;
const neo4j = require('neo4j-driver').v1;

// react routes that require index.html
exports.react = new Set(['user', 'projects']);

// request handlers for server routes
exports.api = {
  GET: {
    users: function getUsers(req) {
      console.log('req called', req.headers);
      return new Promise((resolve, reject) => {
        console.log(req.headers.project);
        const dbSession = dbDriver.session();
        console.log('GET recommended-users');
        dbSession.run(`
          MATCH (user:User)-[:INTERESTEDIN]-(project:Project)
          WHERE project.project = "${req.headers.project}"
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
          .then(() => dbSession.close());;
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
          MATCH (project:Project) WHERE project.project="${req.body.interest}"
          CREATE (user)-[:INTERESTEDIN]->(project)
          return user, project
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