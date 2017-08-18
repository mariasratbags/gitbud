import { combineReducers } from 'redux';

const changeString = (state = 'some message', action) => action.type === 'CHANGE_STRING' ? action.text : state;

const addUsers = (state, action) => {
  if (state === undefined) {
    return [];
  }
  return action.type === 'USERS_ADD' ? action.users : state;
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
  users: addUsers,
  projects,
});
