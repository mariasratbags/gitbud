import { combineReducers } from 'redux';

const changeString = (state = 'some message', action) => action.type === 'CHANGE_STRING' ? action.text : state;

const addUsers = (state, action) => {
  if (state === undefined) {
    return [];
  }
  return action.type === 'USERS_ADD' ? action.users : state;
};

const listProjects = (state, action) => {
  // console.log('state:', state)
  // console.log('action:', action)
  if (state === undefined) {
    return [];
  }
  return action.type === 'LIST_PROJECTS' ? action.projects : state;
};

export default combineReducers({
  message: changeString,
  users: addUsers,
  projects: listProjects,
});
