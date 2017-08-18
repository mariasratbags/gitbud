import { combineReducers } from 'redux';

const changeString = (state = 'some message', action) => action.type === 'CHANGE_STRING' ? action.text : state;

const users = (state, action) => {
  if (state === undefined) {
    return [];
  } else if (action.type === 'USERS_ADD') {
    return action.users;
  } else if (action.type === 'CHANGE_USER_PAIRING') {
    return state.map((user) => {
      if (user.id === action.userId) {
        return Object.assign({}, user, { paired: action.projectId });
      }
      return user;
    });
  }
  return state;
};

const projects = (state, action) => {
  console.log(state);
  if (state === undefined) {
    return [];
  } else if (action.type === 'LIST_PROJECTS') {
    return action.projects;
  } else if (action.type === 'CHANGE_PROJECT_INTEREST') {
    return state.map((project) => {
      if (project.id === action.projectId) {
        return Object.assign({}, project, { interested: action.value });
      }
      return project;
    });
  }
  return state;
};

// hands off to container components with mapStateToProps
export default combineReducers({
  message: changeString,
  users,
  projects,
});
