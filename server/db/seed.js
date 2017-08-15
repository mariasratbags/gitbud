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

session
  .run(`MATCH (n) DETACH DELETE n`)
  .then(result => {
    console.log('graph dropped');
  })
  .catch(error => {
    session.close();
    throw error;
  })
  .then(populateDatabase);

function populateDatabase() {
  session.run(`CREATE (u:User {name: '${name}'}) RETURN u`)
  .then(result => {
    session.close();

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    console.log(node.properties.name);
    driver.close();
  });
}
