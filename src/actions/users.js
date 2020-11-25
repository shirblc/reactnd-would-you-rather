import { _getUsers } from '../_DATA.js';

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const UPDATE_USER = 'UPDATE_USER';
export const CREATE_QUESTION_USER = 'CREATE_QUESTION_USER';

// Async action creator to get the initial users data from the mock API
export function getInitialData() {
	return (dispatch) => {
		return _getUsers().then((users) => {
			dispatch(addInitialData(users))
		})
	}
}

// Action creator to add the initial data to the redux store
function addInitialData(data) {
	return {
		type: RECEIVE_DATA,
		users: data
	}
}

// Action creator to add the user's response
export function updateUser(questionData) {
	const { authedUser, qid, answer } = questionData;
	
	return {
		type: UPDATE_USER,
		authedUser,
		qid,
		answer
	}
}

// Action creator to add the new question to the user's questions array
export function createUserQuestion({ id, author })  {
	return {
		type: CREATE_QUESTION_USER,
		id,
		author
	}
}