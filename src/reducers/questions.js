import { RECEIVE_DATA } from '../actions/questions';

// Questions reducer
export default function questionsReducer(state = {}, action) {
	switch(action.type) {
		// if the action is getting new questions data, add them
		case RECEIVE_DATA:
			return { ...state, ...action.questions }
		// otherwise return the state
		default:
			return state
	}
}