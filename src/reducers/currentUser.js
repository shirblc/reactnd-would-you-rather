import { LOGIN, LOGOUT } from '../actions/currentUser';

// Current user reducer
export default function currentUserReducer(state = null, action) {
	switch(action.type) {
		// if the action is a user login, change the state to the given user ID
		case LOGIN:
			return action.id
		// if the action is a user logout, change the state back to null
		case LOGOUT:
			return null
		// otherwise return the current state
		default:
			return state
	}
}