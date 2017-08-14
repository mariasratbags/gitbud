import { combineReducers } from 'redux';

const changeString = (state = 'some message', action) => action.type === 'CHANGE_STRING' ? action.text : state;

const addUsers = (state, action) => {
  if (state === undefined) {
    return [];
  }
  return action.type === 'USERS_ADD' ? action.users : state;
};

export default combineReducers({
  message: changeString,
  users: addUsers
});
