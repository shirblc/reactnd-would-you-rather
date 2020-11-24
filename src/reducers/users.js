import { RECEIVE_DATA, UPDATE_USER } from '../actions/users';

// Users reducer
export default function usersReducer(state = {}, action) {
	switch(action.type) {
		// if the action is getting new users data, add them
		case RECEIVE_DATA:
			return { ...state, ...action.users }
		// if the action is answering a question, update the user's data
		case UPDATE_USER:
			return { 
				...state,
				[action.authedUser]: {
					...[action.authedUser],
					answers: {
						[action.qid]: [action.answer]
					}
				}
			}
		// otherwise return the state
		default:
			return state
	}
}