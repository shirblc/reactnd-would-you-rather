import React from 'react';
import { connect } from 'react-redux';

class Leaderboard extends React.Component {
	// render method
	render() {
		return (
			<div>hi</div>
		)
	}
}

// Map State to Props
// Get the relevant details for each of the users
function mapStateToProps({ users }) {
	return {
		users: Object.values(users).map(user => {
			return {
				name: user.name,
				avatar: user.avatarURL,
				answers: Object.keys(user.answers).length,
				questions: user.questions.length
		}})
	}
}

export default connect(mapStateToProps)(Leaderboard)