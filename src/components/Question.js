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
				<button id='optionOne' disabled={this.props.answered === true} onClick={(e) => (this.answerQuestion(e.target.id))}>{ this.props.question.optionOne.text }</button>
				{ this.props.answered &&
					<div className='stats'>
						<div>Number of votes: { this.props.question.optionOne.votes.length }</div>
						<div>{ (this.props.question.optionOne.votes.length / this.props.totalVotes * 100).toFixed(2) }% chose this answer.</div>
					</div>
				}
				<div>or</div>
				<button id='optionTwo' disabled={this.props.answered === true} onClick={(e) => (this.answerQuestion(e.target.id))}>{ this.props.question.optionTwo.text }</button>
				{ this.props.answered &&
					<div className='stats'>
						<div>Number of votes: { this.props.question.optionTwo.votes.length }</div>
						<div>{ (this.props.question.optionTwo.votes.length / this.props.totalVotes * 100).toFixed(2) }% chose this answer.</div>
					</div>
				}
			</div>
		)
	}
}

// Map State to Props
// Get the details of the specific question
function mapStateToProps({ questions, currentUser }, { match }) {
	return {
		question: questions[match.params.id],
		// checks whether the user answered the question
		answered: questions[match.params.id].optionOne.votes.includes(currentUser) || questions[match.params.id].optionTwo.votes.includes(currentUser),
		// checks how many votes there are in total for the question
		totalVotes: questions[match.params.id].optionOne.votes.length + questions[match.params.id].optionTwo.votes.length,
		currentUser: currentUser
	}
}

export default connect(mapStateToProps)(Question)