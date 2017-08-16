const driver = require('./index').driver;
const session = driver.session();

const name = 'Brian';

//call functions that seed the db
dropGraph()
  .then(addUsers)
  .then(addProjects)
  .then(() => {
    session.close();
    driver.close();
  });



//deletes all nodes and relationships in the graph
function dropGraph() {
  var dropGraphQueryString = 'MATCH (n) DETACH DELETE n';
  return session.run(dropGraphQueryString)
    .then(result => {
    console.log('graph dropped');
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

var addUsersQueryString = `
  CREATE (:User {rating: 50, name: 'Brian'})
  CREATE (:User {rating: 50, name: 'Peter'})
  CREATE (:User {rating: 50, name: 'Francis'})
  CREATE (:User {rating: 50, name: 'Shaikat'})
  `;

//add user nodes
function addUsers() {
  return session.run(addUsersQueryString)
    .then(result => {
      console.log('users added');
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

var addProjectsQueryString = `CREATE (:Project {project: 'Hello GitBud', language:'JavaScript', experience: 'beginner'})
  CREATE (:Project {project: 'N-Queens', language:'Assembly', experience: 'advanced'})`;

//add project nodes
function addProjects() {
  return session.run(addProjectsQueryString)
    .then(result => {
      console.log('projects added');
    })
    .catch(error => {
      session.close();
      throw error;
    });
}
