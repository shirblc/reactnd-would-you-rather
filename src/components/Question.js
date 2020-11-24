import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component {
	// render
	render() {
		return (
			<div>
				<h3>Would you rather...</h3>
				<button>{ this.props.question.optionOne.text }</button>
				{ this.props.answered &&
					<div className='stats'>
						<div>Number of votes: { this.props.question.optionOne.votes.length }</div>
						<div>{ this.props.question.optionOne.votes.length / this.props.totalVotes * 100 }% chose this answer.</div>
					</div>
				}
				<div>or</div>
				<button>{ this.props.question.optionTwo.text }</button>
				{ this.props.answered &&
					<div className='stats'>
						<div>Number of votes: { this.props.question.optionTwo.votes.length }</div>
						<div>{ this.props.question.optionTwo.votes.length / this.props.totalVotes * 100 }% chose this answer.</div>
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