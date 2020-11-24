import React from 'react';
import { connect } from 'react-redux';
import { addAnswer } from '../actions/shared';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Question extends React.Component {
	// Handles user click on one of the response buttons
	answerQuestion(userResponse) {
		this.props.dispatch(addAnswer({
			authedUser: this.props.currentUser,
			qid: this.props.match.params.id, 
			answer: userResponse
		}));
	}
	
	// render
	render() {
		return (
			<div>
				<Link to='/'><FontAwesomeIcon icon='arrow-left'/></Link>
				<h3>Would you rather...</h3>
				{
					Object.entries(this.props.question.options).map(entry => (
						<div className='answer'>
							<button key={entry[0]} id={entry[0]} disabled={this.props.answered === true} onClick={(e) => (this.answerQuestion(e.target.id))}>{ entry[1].text }</button>
							{ 
								this.props.answered &&
								<div className='stats'>
									<div>Number of votes: { entry[1].votes.length }</div>
									<div>{ (entry[1].votes.length / this.props.totalVotes * 100).toFixed(2) }% chose this answer.</div>
								</div>
							}
						</div>
					))
				}
			</div>
		)
	}
}

// Map State to Props
// Get the details of the specific question
function mapStateToProps({ questions, currentUser }, { match }) {
	const originalQuestion = questions[match.params.id];
	// move the question's potential answers to its own property; this is used by the template for more concise code
	const quest = {
		...originalQuestion,
		options: {
			optionOne: {
			  ...originalQuestion.optionOne
			},
			optionTwo: {
			  ...originalQuestion.optionTwo
			}
		}
	}
	
	return {
		question: quest,
		// checks whether the user answered the question
		answered: originalQuestion.optionOne.votes.includes(currentUser) || originalQuestion.optionTwo.votes.includes(currentUser),
		// checks how many votes there are in total for the question
		totalVotes: originalQuestion.optionOne.votes.length + originalQuestion.optionTwo.votes.length,
		currentUser: currentUser
	}
}

export default connect(mapStateToProps)(Question)