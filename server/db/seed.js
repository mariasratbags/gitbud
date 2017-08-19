const driver = require('./index').driver;
const session = driver.session();

// Deletes all nodes and relationships in the graph
const dropGraph = function dropGraph() {
  const dropGraphQueryString = 'MATCH (n) DETACH DELETE n';
  return session.run(dropGraphQueryString)
    .then((result) => {
    console.log('Graph dropped');
    })
    .catch((error) => {
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
    .catch((error) => {
      session.close();
      throw error;
    });
}

const addProjectsQueryString = `
  CREATE
    (:Project {project: 'Hello GitBud', language:'JavaScript', experience: 'beginner', link: 'https://github.com/cranebaes/hello-gitbud'}),
    (:Project {project: 'N-Queens', language:'Assembly', experience: 'advanced', link: 'https://github.com/cranebaes'})
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

//Create INTERESTED_IN relationships between users and projects
const addInterestedInRelationshipsQueryString = `
  MATCH (brian:User) WHERE brian.name = "Brian"
  MATCH (peter:User) WHERE peter.name = "Peter"
  MATCH (francis:User) WHERE francis.name = "Francis"
  MATCH (shaikat:User) WHERE shaikat.name = "Shaikat"
  MATCH (helloGitBud:Project) WHERE helloGitBud.project = "Hello GitBud"
  MATCH (nQueens:Project) WHERE nQueens.project = "N-Queens"
  CREATE
    (brian)-[:INTERESTED_IN]->(helloGitBud),
    (peter)-[:INTERESTED_IN]->(helloGitBud),
    (francis)-[:INTERESTED_IN]->(nQueens),
    (shaikat)-[:INTERESTED_IN]->(nQueens)
  `;

const addInterestedInRelationships = function addInterestedInRelationships() {
  return session.run(addInterestedInRelationshipsQueryString)
    .then((result) => {
      console.log('INTERESTED_IN relationships added');
    })
    .catch((error) => {
      session.close();
      throw error;
    });
}

// Add pair
const addPairQueryString = `
  MATCH (brian:User) WHERE brian.name = "Brian"
  MATCH (shaikat:User) WHERE shaikat.name = "Shaikat"
  MATCH (nQueens:Project) WHERE nQueens.project = "N-Queens"
  CREATE
    (group:Group),
    (brian)-[:PAIRED_WITH]->(group),
    (shaikat)-[:PAIRED_WITH]->(group),
    (group)-[:WORKING_ON]->(nQueens)
  `;

const addPair = function addPair() {
  return session.run(addPairQueryString)
    .then((result) => {
      console.log('pair added');
    })
    .catch((error) => {
      session.close();
      throw error;
    });
}

// Call functions that seed the db
dropGraph()
  .then(addUsers)
  .then(addProjects)
  .then(addInterestedInRelationships)
  .then(addPair)
  .then(() => {
    session.close();
    driver.close();
  });
