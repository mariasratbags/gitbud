exports = {
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
  },
  POST: {

  },
};
