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
          MATCH (user:User)-[:INTERESTED_IN]->(project:Project)
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
    projects: function getProjects(req) {
      return new Promise((resolve, reject) => {
        const dbSession = dbDriver.session();
        console.log('GET projects');
        dbSession.run(`
            MATCH (user:User {ghId: ${ req.user.ghInfo.id }})-->(group:Group)-->(project:Project)
            WITH user, group, project
            MATCH (pair:User)-->(group)-->(project)
            WHERE NOT pair = user
            RETURN COLLECT(ID(pair)) as pairs, true as interested, project
            UNION
            MATCH (user:User {ghId: ${ req.user.ghInfo.id }})-[:INTERESTED_IN]->(project:Project)
            WHERE NOT (user)-->(:Group)-->(project)
            RETURN false as pairs, true as interested, project
            UNION
            MATCH (user:User {ghId: ${ req.user.ghInfo.id }}), (project:Project)
            WHERE NOT (user)-->(:Group)-->(project) AND NOT (user)-[:INTERESTED_IN]->(project)
            RETURN false as pairs, false as interested, project
         `)
          .then((res) => {
            resolve(res.records.map(project => 
              new db.models.Project(project.get('project'), project.get('pairs'), project.get('interested'))
            ));
          })
          .catch(reject)
          .then(() => dbSession.close());
      });
    },
  },
  POST: {
    projects: function projects(req) {
      console.log(req.body)
      return new Promise((resolve, reject) => {
        const dbSession = dbDriver.session();
        console.log('POST projects');
        dbSession.run(
          `
          MATCH (user:User) WHERE user.ghId=${Number(req.user.ghInfo.id)}
          MATCH (project:Project) WHERE ID(project) = ${Number(req.body.projectId)}
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
    },
    pair: function addPair(req) {
      return new Promise((resolve, reject) => {
        const dbSession = dbDriver.session();
        console.log('POST pair');
        dbSession.run(`
          MATCH (project:Project) WHERE ID(project) = ${Number(req.body.project)}
          MATCH (user:User) WHERE user.ghId = ${Number(req.user.ghInfo.id)}
          MATCH (pair:User) WHERE ID(pair) = ${Number(req.body.partnered)}
          MERGE (user)-[:PAIRED_WITH]->(group:Group)<-[:PAIRED_WITH]-(pair)
          MERGE (group)-[:WORKING_ON]->(project)
          return user, pair, group, project
        `)
          .then((res) => {
            console.log(res);
            resolve(res);
          })
          .catch(reject)
          .then(() => dbSession.close());
      });
    }
  },

};

exports.auth = {
  GET: {
    signout: function signout(req, res) {
      // destroy session and redirect to home
      req.logout();
      res.redirect('/');
    },
    authenticated: function checkAuthenticated(req, res) {
      // If user signed in, send account details
      if (req.isAuthenticated()) {
        const dbSession = db.driver.session();
        dbSession.run(`
          MATCH (user:User {ghId: ${ req.user.ghInfo.id }}) RETURN user
        `)
          .then((result) => {
            res.json(new db.models.User(result.records[0].get('user')));
            dbSession.close();
          });
      } else {
        res.send(false);
      }
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
