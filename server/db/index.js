const neo4j = require('neo4j-driver').v1;

const uri = 'bolt://localhost';
const driver = neo4j.driver(uri, neo4j.auth.basic('neo4j', 'neo'));

exports.session = driver.session();

exports.session.run('MATCH (p {name: "Shaikat"}) RETURN p')
  .then(console.log)
  .catch(console.error);
