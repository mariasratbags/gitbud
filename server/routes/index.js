exports.react = new Set(['/user', '/projects']);



// request handlers for server routes
exports.api = {
  GET: {
    'users': function getUsers() {
      return new Promise((resolve) => {
        resolve([
          { name: 'Francis' },
          { name: 'Peter' },
          { name: 'Brian' },
          { name: 'Shaikat' },
        ]);
      });
    },
  },
  POST: {

  },
};
