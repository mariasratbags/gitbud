import { combineReducers } from 'redux';

const changeString = (state = 'some message', action) => action.type === 'CHANGE_STRING' ? action.text : state;

const addUsers = (state, action) => {
  if (state === undefined) {
    return [];
  }
  console.log('action: ', action);
  console.log('state: ', state);
  return action.type === 'USERS_ADD' ? action.users : state;
};

const addProjectsList = (state, action) => {
  if (state === undefined) {
    return [];
  }
  return action.type === 'LIST_PROJECTS' ? action.projects : state;
};

//hands off to container components with mapStateToProps
export default combineReducers({
  message: changeString,
  users: addUsers,
  projects: addProjectsList,
});
