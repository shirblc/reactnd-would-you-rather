// React / Redux imports
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// App imports
import { logout } from '../actions/currentUser';

class Home extends React.Component {
	state = {
		questions: 'unanswered'
	}

	// CTOR
	constructor(props) {
		super(props);
		// bind this in the logout method to the component, rather than the event target
		this.logOutBound = this.logOut.bind(this);
	}
	
	// Log out - responsible for logging the current user out
	logOut() {
		this.props.dispatch(logout());
	}
	
	// update the type of questions to be shown (answered/unanswered/all)
	onUpdate(event) {
		event.preventDefault();
		this.setState({
			questions: event.target.value
		})
	}
	
	// render method
	render() {
		return (<div id='dashboard'>
			<h2>{`${this.props.currentUser.name}'s Questions`}</h2> <button onClick={this.logOutBound}>Logout</button>
			<label htmlFor='viewQs' id='selectLabel'>Questions to view:</label>
			<select value={this.state.questions} onChange={(e) => (this.onUpdate(e))} id='viewQs'>
					<option value='unanswered'>Unanswered Questions</option>
					<option value='answered'>Answered Questions</option>
					<option value='all'>All Questions</option>
				</select>
			{ (this.state.questions === 'unanswered' || this.state.questions  === 'all') &&
				<div className='questionList'>
					<h3>Unanswered Questions</h3>
					<ul>
						{
							this.props.questions.filter(q => q.answered === false).map(question => (
								<li key={question.id}><Link to={`/question/${question.id}`}>{ question.option1 + ' or ' + question.option2 }</Link></li>
							))
						}
					</ul>
				</div>
			}
			{ (this.state.questions === 'answered' || this.state.questions  === 'all') &&
				<div className='questionList'>
					<h3>Answered Questions</h3>
					<ul>
						{
							this.props.questions.filter(q => q.answered === true).map(question => (
								<li key={question.id}><Link to={`/question/${question.id}`}>{ question.option1 + ' or ' + question.option2 }</Link></li>
							))
						}
					</ul>
				</div>
			}
		</div>)
	}
}

// Map State to Props
// Gets the current user and a list of answered / unanswered questions for that user
function mapStateToProps({ users, questions, currentUser }) {
	return {
		currentUser: users[currentUser],
		questions: Object.entries(questions).map(entry => {
			// return the options, the question's ID and whether or not the user already chose an answer
			return {
				option1: entry[1].optionOne.text, 
				option2: entry[1].optionTwo.text,
				answered: entry[1].optionOne.votes.includes(currentUser) || entry[1].optionTwo.votes.includes(currentUser),
				id: entry[0]
			}
		})
	}
}

export default connect(mapStateToProps)(Home)