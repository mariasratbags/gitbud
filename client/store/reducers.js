export default (state = 'some message', action) => action.type === 'CHANGE_STRING' ? action.text : state;
