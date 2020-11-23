import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
	render() {
		return (<div>
			<h2>{`${this.props.currentUser.name}'s Questions`}</h2>
			<div>
				<h3>Unanswered Questions</h3>
				<ul>
					{
						this.props.questions.filter(q => q.answered === false).map(question => (
							<li key={question.id}>{ question.option1 + ' or ' + question.option2 }</li>
						))
					}
				</ul>
			</div>
			<div>
				<h3>Answered Questions</h3>
				<ul>
					{
						this.props.questions.filter(q => q.answered === true).map(question => (
							<li key={question.id}>{ question.option1 + ' or ' + question.option2 }</li>
						))
					}
				</ul>
			</div>
		</div>)
	}
}

// Map State to Props
// Gets the current user and a list of answered / unanswered questions for that user
function mapStateToProps({ users, questions }, { userID }) {
	return {
		currentUser: users[userID],
		questions: Object.entries(questions).map(entry => {
			// return the options, the question's ID and whether or not the user already chose an answer
			return {
				option1: entry[1].optionOne.text, 
				option2: entry[1].optionTwo.text,
				answered: entry[1].optionOne.votes.includes(userID) || entry[1].optionTwo.votes.includes(userID),
				id: entry[0]
			}
		})
	}
}

export default connect(mapStateToProps)(Home)