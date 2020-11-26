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
			<div id='questionContainer'>
				<Link to='/'><FontAwesomeIcon icon='arrow-left'/></Link>
				<img src={this.props.question.userPic} alt='user profile pic' className='profilePic' />
				<div id='titleCont'>
					<div>Asked:</div>
					<h3>Would you rather...</h3>
				</div>
				{
					Object.entries(this.props.question.options).map(entry => (
						<div className='answer' key={entry[0]}>
							<button id={entry[0]} disabled={this.props.answered === true} onClick={(e) => (this.answerQuestion(e.target.id))}>{ entry[1].text }</button>
							{ entry[1].votes.includes(this.props.currentUser) &&
							  <FontAwesomeIcon icon='check' className='selected' /> }
							{ this.props.answered &&
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
function mapStateToProps({ questions, currentUser, users }, { match }) {
	const originalQuestion = questions[match.params.id];
	// move the question's potential answers to its own property; this is used by the template for more concise code
	const quest = {
		...originalQuestion,
		userPic: users[originalQuestion.author].avatarURL,
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