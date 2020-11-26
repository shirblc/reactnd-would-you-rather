// React / Redux imports
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// App imports
import { addAnswer } from '../actions/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Question extends React.Component {
	/*
  	Function Name: answerQuestion()
  	Function Description: Handles user click on one of the response buttons (registering the user's response).
  	Parameters: userResponse (string) - optionOne or optionTwo, depending on the user's choice.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	answerQuestion(userResponse) {
		this.props.dispatch(addAnswer({
			authedUser: this.props.currentUser,
			qid: this.props.match.params.id, 
			answer: userResponse
		}));
	}
	
	/*
  	Function Name: render()
  	Function Description: Renders the component.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	render() {
		return (
			<React.Fragment>
				{ this.props.question
					? <div id='questionContainer'>
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
					: <div id='errorMessage'>
							<h3>This question doesn't exist!</h3>
							<Link to='/'>Go back to home page</Link>
						</div>
				}
			</React.Fragment>
			
		)
	}
}

// Map State to Props
// Get the details of the specific question
function mapStateToProps({ questions, currentUser, users }, { match }) {
	// move the question's potential answers to its own property; this is used by the template for more concise code
	const originalQuestion = questions[match.params.id] ? ({
			...questions[match.params.id],
			userPic: users[questions[match.params.id].author].avatarURL,
			options: {
				optionOne: {
				  ...questions[match.params.id].optionOne
				},
				optionTwo: {
				  ...questions[match.params.id].optionTwo
				}
			}
		}) : null;
	
	return {
		question: originalQuestion,
		// checks whether the user answered the question
		answered: originalQuestion ? originalQuestion.optionOne.votes.includes(currentUser) || originalQuestion.optionTwo.votes.includes(currentUser) : 0,
		// checks how many votes there are in total for the question
		totalVotes: originalQuestion ? originalQuestion.optionOne.votes.length + originalQuestion.optionTwo.votes.length : 0,
		currentUser: currentUser
	}
}

export default connect(mapStateToProps)(Question)