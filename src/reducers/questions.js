import { RECEIVE_DATA, UPDATE_QUESTION, CREATE_QUESTION } from '../actions/questions';

// Questions reducer
export default function questionsReducer(state = {}, action) {
	switch(action.type) {
		// if the action is getting new questions data, add them
		case RECEIVE_DATA:
			return { ...state, ...action.questions }
		// if the action is answering a question, update the question's data
		case UPDATE_QUESTION:
			return { 
				...state,
				[action.qid]: {
					...state[action.qid],
					[action.answer]: {
						...state[action.qid][action.answer],
						votes: [ ...state[action.qid][action.answer].votes, action.authedUser ]
					}
				}
			}
		// if the action is adding a new question, add it to the list
		case CREATE_QUESTION:
			return {
				...state,
				[action.question['id']]: action.question
			}
		// otherwise return the state
		default:
			return state
	}
}