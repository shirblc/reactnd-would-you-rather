import { _getQuestions } from '../_DATA.js';

export const RECEIVE_DATA = 'RECEIVE_DATA';

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