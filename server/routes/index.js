/*
 *  ROUTES
 *  (Functions all invoked in /server/request-handler)
 *
 *  This module exports request handlers for most of the routes
 *  as well as a Set for quick responses where index.html is required.
 *
*/

// React routes that require index.html.
exports.react = new Set(['user', 'projects']);
// Endpoints are handled in the relevant files and exported
// for request-handler
exports.api = require('./api');
exports.auth = require('./auth');
