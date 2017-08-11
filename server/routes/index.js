const fs = require('fs');
const path = require('path');

// cache index.html to serve on React routes
fs.readFile(path.join(__dirname, '../../dist/index.html'), 'utf8', (err, data) => {
  if (err) {
    throw new Error(err);
  } else {
    exports.index = data;
  }
});

// request handlers for server routes
exports.routes = {
  GET: {
    '/': function getRoot() {
      return new Promise((resolve) => {
        resolve('hello world');
      });
    },
    '/users': function getUsers() {
      return new Promise((resolve) => {
        resolve([
          { name: 'Francis' },
          { name: 'Peter' },
          { name: 'Brian' },
          { name: 'Shaikat' },
        ]);
      });
    },
    '/user': function getUser() {
      return new Promise((resolve, reject) => {
        resolve(exports.index);
      });
    },
    '/favicon.ico': function getFavicon() {
      return new Promise((resolve) => {
        resolve();
      });
    },
  },
  POST: {

  },
};
