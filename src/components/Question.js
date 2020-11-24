import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component {
	render() {
		return (
			<div>
				<h3>Would you rather...</h3>
				<button>{ this.props.question.optionOne.text }</button>
				or
				<button>{ this.props.question.optionTwo.text }</button>
			</div>
		)
	}
}

// Map State to Props
// Get the details of the specific question
function mapStateToProps({ questions, currentUser }, { questionID }) {
	return {
		question: questions[questionID],
		currentUser: currentUser
	}
}

export default connect(mapStateToProps)(Question)