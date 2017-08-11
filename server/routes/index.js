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
  projects: {
    'GET': function getProjects() {
      return new Promise((resolve) => {
        resolve([
          { project: 'Hello GitBud', languages: ['JavaScript', 'HTML', 'CSS'],
            experience: 'beginner', userIds: [0, 1, 2]},
          { project: 'N-Queens', languages: ['JavaScript', 'HTML', 'BackBone'],
            experience: 'Boss mode', userIds: [0, 3]},
        ]);
      });
    }
  }
};
