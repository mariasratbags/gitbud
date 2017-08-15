// import neo4 driver
const neo4j = require('neo4j-driver').v1;
// set variables to connect
const url = process.env.GRAPHENEDB_BOLT_URL || 'bolt://localhost';
const username = process.env.GRAPHENEDB_BOLT_USERNAME || 'neo4j';
const password = process.env.GRAPHENEDB_BOLT_PASSWORD || 'neo';
// connect and create session
const driver = neo4j.driver(url, neo4j.auth.basic(username, password));
const session = driver.session();
// make available to other modules
exports.runQuery = session.run.bind(session);

// exports.runQuery('MATCH (p {name: "Shaikat"}) RETURN p')
//   .then(console.log)
//   .catch(console.error);
