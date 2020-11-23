export const LOGIN = 'LOGIN';

// Action creator for handling a user logging in
export function login(id) {
	return {
		type: LOGIN,
		id
	}
}