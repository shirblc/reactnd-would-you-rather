import { _saveQuestionAnswer } from '../_DATA';
import { updateQuestion } from './questions';
import { updateUser } from './users';

// Async action creator to add the user's response to the mock API
export function addAnswer(answerDetails) {
	return (dispatch) => {
		return _saveQuestionAnswer(answerDetails).then(() => {
			dispatch(updateQuestion(answerDetails));
			dispatch(updateUser(answerDetails))
		})
	}
}