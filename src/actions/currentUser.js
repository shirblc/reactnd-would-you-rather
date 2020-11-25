export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action creator for handling a user logging in
export function login(id) {
	return {
		type: LOGIN,
		id
	}
}

// Action creator for handling user logout
export function logout() {
	return {
		type: LOGOUT
	}
}