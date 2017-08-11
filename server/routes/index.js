const fs = require('fs');
const path = require('path');

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
        fs.readFile(path.join(__dirname, '../../dist/index.html'), 'utf8', (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
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
