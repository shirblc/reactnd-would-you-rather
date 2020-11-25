import { _getQuestions } from '../_DATA.js';

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const CREATE_QUESTION = 'CREATE_QUESTION';

// Async action creator to get the initial questions data from the mock API
export function getInitialData() {
	return (dispatch) => {
		return _getQuestions().then((questions) => {
			dispatch(addInitialData(questions))
		})
	}
}

// Action creator to add the initial data to the redux store
function addInitialData(data) {
	return {
		type: RECEIVE_DATA,
		questions: data
	}
}

// Action creator to add the user's response
export function updateQuestion(questionData) {
	const { authedUser, qid, answer } = questionData;
	
	return {
		type: UPDATE_QUESTION,
		authedUser,
		qid,
		answer
	}
}

// Action creator to add a new question
export function createQuestion(question) {
	return {
		type: CREATE_QUESTION,
		question
	}
}