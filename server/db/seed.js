// import neo4 driver
const neo4j = require('neo4j-driver').v1;
// set variables to connect
const url = process.env.GRAPHENEDB_BOLT_URL || 'bolt://localhost';
const username = process.env.GRAPHENEDB_BOLT_USERNAME || 'neo4j';
const password = process.env.GRAPHENEDB_BOLT_PASSWORD || 'neo';
// connect and create session
const driver = neo4j.driver(url, neo4j.auth.basic(username, password));
const session = driver.session();

const name = 'Brian';

//call functions that seed the db
dropGraph()
  .then(addUsers)
  .catch(error => console.error)
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

var addUsersQueryString = `CREATE (:User {name: 'Brian'})
  CREATE (:User {name: 'Peter'})
  CREATE (:User {name: 'Francis'})
  CREATE (:User {name: 'Shaikat'})`;

//initializes graph with data
function addUsers() {
  return session.run(addUsersQueryString)
    .then(result => {
      const singleRecord = result.records[0];
      const node = singleRecord.get(0);
      console.log(node.properties.name);
    });
}






// var createQuery = `CREATE (u:User {name: 'shaikat'}) RETURN u`;