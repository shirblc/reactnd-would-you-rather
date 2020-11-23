import { LOGIN } from '../actions/currentUser';

// Current user reducer
export default function currentUserReducer(state = null, action) {
	switch(action.type) {
		// if the action is a user login, change the state to the given user ID
		case LOGIN:
			return action.id
		// otherwise return the current state
		default:
			return state
	}
}