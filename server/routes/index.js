exports.react = new Set(['/user', '/projects']);



// request handlers for server routes
exports.api = {
  users: {
    'GET': function getUsers() {
      return new Promise((resolve) => {
        resolve([
          { userId: 1, username: 'Francis' },
          { userId: 2, username: 'p-w-party-m' },
          { userId: 3, username: 'brianheartsocketio' },
          { userId: 4, username: 'shaikat' },
        ]);
      });
    },
  },
  projects: {
    'GET': function getProjects() {
      return new Promise((resolve) => {
        resolve([
          { project: 'Hello GitBud', languages: ['JavaScript', 'HTML', 'CSS'],
            experience: 'beginner', userIds: [0, 1, 2] },
          { project: 'N-Queens', languages: ['JavaScript', 'HTML', 'BackBone'],
            experience: 'Boss mode', userIds: [0, 3] },
        ]);
      });
    }
  },
  'recommended-pairs': {
    'GET': function getProjects() {
      return new Promise((resolve) => {
        resolve([
          { userId: 2, username: 'p-w-party-m', rating: 89 },
          { userId: 3, username: 'brianheartsocketio', rating: 100 },
          { userId: 4, username: 'shaikat', rating: 63 },
        ]);
      });
    }
  }
};
