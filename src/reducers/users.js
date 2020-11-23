import { RECEIVE_DATA } from '../actions/users';

// Users reducer
export default function usersReducer(state = {}, action) {
	switch(action.type) {
		// if the action is getting new users data, add them
		case RECEIVE_DATA:
			return { ...state, ...action.users }
		// otherwise return the state
		default:
			return state
	}
}