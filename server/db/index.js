/*
  This module gathers all the db functionality and
  exports it all as one.

  THINGS TO FIX:
  There's a lot of repeated code across all the db (sub-)modules
  which would be great to fix.

  Ideally, this module would export a function that takes a query
  and returns a promise. This function would itself create a
  session, run the query, close the session and then resolve or reject
  the output.
*/

// import neo4 driver
const neo4j = require('neo4j-driver').v1;
// set variables to connect
const url = process.env.GRAPHENEDB_BOLT_URL || 'bolt://localhost';
const username = process.env.GRAPHENEDB_BOLT_USERNAME || 'neo4j';
const password = process.env.GRAPHENEDB_BOLT_PASSWORD || 'neo';
// connect and create session
exports.driver = neo4j.driver(url, neo4j.auth.basic(username, password));

// exports models to deal with search results
exports.models = require('./models');
