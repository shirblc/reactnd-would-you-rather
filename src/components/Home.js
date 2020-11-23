import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
	render() {
		return (<div>
			<h2>{`${this.props.currentUser.name}'s Questions`}</h2>
			<div>
				<h3>Unanswered Questions</h3>
			</div>
			<div>
				<h3>Answered Questions</h3>
			</div>
		</div>)
	}
}

function mapStateToProps({ users }, { userID }) {
	return {
		currentUser: users[userID]
	}
}

export default connect(mapStateToProps)(Home)