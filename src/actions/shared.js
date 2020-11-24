import { _saveQuestionAnswer } from '../_DATA';
import { updateQuestion } from './questions';
import { updateUser } from './users';

// Async action creator to add the user's response to the mock API
export function addAnswer({ authedUser, qid, answer }) {
	return (dispatch) => {
		return _saveQuestionAnswer({ authedUser, qid, answer }).then(({ users, questions }) => {
			dispatch(updateQuestion(questions[qid]));
			dispatch(updateUser(users[authedUser]))
		})
	}
}