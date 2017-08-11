exports.react = new Set(['/user', '/projects']);



// request handlers for server routes
exports.api = {
  users: {
    'GET': function getUsers() {
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
};
