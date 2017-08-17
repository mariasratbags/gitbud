const driver = require('./index').driver;
const session = driver.session();

const name = 'Brian';

// Call functions that seed the db
dropGraph()
  .then(addUsers)
  .then(addProjects)
  .then(() => {
    session.close();
    driver.close();
  });



// Deletes all nodes and relationships in the graph
const dropGraph = function dropGraph() {
  const dropGraphQueryString = 'MATCH (n) DETACH DELETE n';
  return session.run(dropGraphQueryString)
    .then((result) => {
    console.log('graph dropped');
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

const addUsersQueryString = `
  CREATE
    (:User {rating: 50, name: 'Brian', language: 'JavaScript'}),
    (:User {rating: 50, name: 'Peter', language: 'JavaScript'}),
    (:User {rating: 50, name: 'Francis', language: 'JavaScript'}),
    (:User {rating: 50, name: 'Shaikat', language: 'JavaScript'})
  `;

// Add user nodes
function addUsers() {
  return session.run(addUsersQueryString)
    .then((result) => {
      console.log('users added');
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

const addProjectsQueryString = `
  CREATE
    (:Project {project: 'Hello GitBud', language:'JavaScript', experience: 'beginner'}),
    (:Project {project: 'N-Queens', language:'Assembly', experience: 'advanced'})
  `;

// Add project nodes
const addProjects = function addProjects() {
  return session.run(addProjectsQueryString)
    .then((result) => {
      console.log('projects added');
    })
    .catch((error) => {
      session.close();
      throw error;
    });
}
