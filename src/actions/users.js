import { _getUsers } from '../_DATA.js';

export const RECEIVE_DATA = 'RECEIVE_DATA';

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