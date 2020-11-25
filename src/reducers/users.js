import { RECEIVE_DATA, UPDATE_USER, CREATE_QUESTION } from '../actions/users';

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
					...state[action.authedUser],
					answers: {
						[action.qid]: [action.answer]
					}
				}
			}
		// if the action is creating a new question, add the ID to the user's questions
		case CREATE_QUESTION:
			return {
				...state,
				[action.qUser]: {
					...state[action.qUser],
					questions: [ ...state[action.qUser].questions, action.qid ]
				}
			}
		// otherwise return the state
		default:
			return state
	}
}