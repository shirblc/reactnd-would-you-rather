import { _saveQuestionAnswer,  _saveQuestion } from '../_DATA';
import { updateQuestion, createQuestion } from './questions';
import { updateUser, createUserQuestion } from './users';

// Async action creator to add the user's response to the mock API
export function addAnswer(answerDetails) {
	return (dispatch) => {
		return _saveQuestionAnswer(answerDetails).then(() => {
			dispatch(updateQuestion(answerDetails));
			dispatch(updateUser(answerDetails))
		})
	}
}

// Async action creator to add a new question to the mock API
export function addQuestion(question) {
	return (dispatch) => {
		return _saveQuestion(question).then((formattedQ)  => {
			dispatch(createQuestion(formattedQ));
			dispatch(createUserQuestion(formattedQ));
		})
	}
}