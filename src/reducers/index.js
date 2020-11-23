import { combineReducers } from 'redux';
import questionsReducer from './questions';
import usersReducer from './users';
import currentUserReducer from './currentUser';

export default combineReducers({
	questions: questionsReducer,
	users: usersReducer,
	currentUser: currentUserReducer
})