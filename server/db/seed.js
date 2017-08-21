/*
 * I hate this file. You hate this file. Everyone hates this file.
 * 
 * It's full or repeated code, it's ugly and it's stupid. Please kill it.
 */
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
    (:User {rating: 80, ghId: 0, name: 'Robb Stark', description: "I'm here to find a mentor who can guide me to make wise decisions.", experience: 'Beginner', language: 'JavaScript', avatarUrl: 'http://i.imgur.com/brqt5mo.jpg'}),
    (:User {rating: 90, ghId: 1, name: 'Arya Stark', description: "Looking to practice and gain experience by pair programming on projects.", experience: 'Intermediate', language: 'JavaScript', avatarUrl: 'http://i.imgur.com/yGmkAdQ.jpg'}),
    (:User {rating: 100, ghId: 2, name: 'Jon Snow', description: "I've hit a wall learning programming and would like to climb over it this winter by working on projects.", experience: 'Intermediate', language: 'JavaScript', avatarUrl: 'http://i.imgur.com/YoHDe9x.jpg'}),
    (:User {rating: 70, ghId: 3, name: 'Bran Stark', description: "I have seen a lot of code, and would like to help others see what I've seen by pairing!", experience: 'Advanced', language: 'C++', avatarUrl: 'http://i.imgur.com/jzc2vxp.png'})
  `;

// Add user nodes
function addUsers() {
  return session.run(addUsersQueryString)
    .then((result) => {
      console.log('Users added');
    })
    .catch((error) => {
      session.close();
      throw error;
    });
}

const addProjectsQueryString = `
  CREATE
    (:Project {project: 'Hello GitBud', language: 'JavaScript', experience: 'Beginner', link: 'https://github.com/cranebaes/hello-gitbud', description: "Get familiar with contributing to open source projects by making a first pull request. In this project, you will learn to use CDN and make pull request.", structure: '[{"text":"Need to add jQuery to application","hint":"Hint: Look up what a content delivery network (CDN) is","complete":false},{"text":"Make your first pull request","hint":"Hint: Refer to the README.md in the repository","complete":false}]'}),
    (:Project {project: 'Random Quote Machine', language: 'JavaScript', experience: 'Beginner', link: 'https://github.com/cranebaes/random-quote-machine', description: "Learn to work with pre-written code to analyze and debug possible issues. In this project, you will learn to locate and solve minor bugs in an existing codebase.", structure: '[{"text":"Missing jQuery library","hint":"Hint: Remember CDN?","complete":false},{"text":"script.js and styles.css are not being loaded","complete":false},{"text":"Quote Me button is not functioning","hint":"Hint: Which function is invoked on button click?","complete":false},{"text":"Quote Me button is not being stylized correctly","complete":false},{"text":"Typo in title of index.html","complete":false},{"text":"Dummy quote that was used for testing is included","complete":false}, {"text":"Make a pull request","hint":"Hint: Remember to end your files with a newline","complete":false}]'}),
    (:Project {project: 'TBD-Intermediate', language: 'JavaScript', experience: 'Intermediate', link: 'https://github.com/cranebaes', description: "TBD", structure: '[{"text":"TBD","hint":"Hint: TBD","complete":false}]'}),
    (:Project {project: 'TBD-Advanced', language: 'JavaScript', experience: 'Advanced', link: 'https://github.com/cranebaes', description: "TBD", structure: '[{"text":"TBD","hint":"Hint: TBD","complete":false}]'})
  `;

// Add project nodes
const addProjects = function addProjects() {
  return session.run(addProjectsQueryString)
    .then((result) => {
      console.log('Projects added');
    })
    .catch((error) => {
      session.close();
      throw error;
    });
}

//Create INTERESTED_IN relationships between users and projects
const addInterestedInRelationshipsQueryString = `
  MATCH (robb:User) WHERE robb.name = "Robb Stark"
  MATCH (arya:User) WHERE arya.name = "Arya Stark"
  MATCH (jon:User) WHERE jon.name = "Jon Snow"
  MATCH (bran:User) WHERE bran.name = "Bran Stark"
  MATCH (helloGitBud:Project) WHERE helloGitBud.project = "Hello GitBud"
  MATCH (randomQuoteMachine:Project) WHERE randomQuoteMachine.project = "Random Quote Machine"
  CREATE
    (robb)-[:INTERESTED_IN]->(helloGitBud),
    (arya)-[:INTERESTED_IN]->(helloGitBud),
    (jon)-[:INTERESTED_IN]->(randomQuoteMachine),
    (bran)-[:INTERESTED_IN]->(randomQuoteMachine)
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
  MATCH (robb:User) WHERE robb.name = "Robb Stark"
  MATCH (bran:User) WHERE bran.name = "Bran Stark"
  MATCH (randomQuoteMachine:Project) WHERE randomQuoteMachine.project = "Random Quote Machine"
  CREATE
    (group:Group),
    (robb)-[:PAIRED_WITH]->(group),
    (bran)-[:PAIRED_WITH]->(group),
    (group)-[:WORKING_ON]->(randomQuoteMachine)
  `;

const addPair = function addPair() {
  return session.run(addPairQueryString)
    .then((result) => {
      console.log('PAIRED_WITH relationships added');
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
