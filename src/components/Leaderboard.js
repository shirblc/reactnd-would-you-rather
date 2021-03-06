// React / Redux imports
import React from 'react';
import { connect } from 'react-redux';

class Leaderboard extends React.Component {
	/*
  	Function Name: render()
  	Function Description: Renders the component.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	render() {
		return (
			<table id='leaderboard'>
				<thead>
					<tr>
						<td>User Pic</td>
						<td>User Name</td>
						<td>Answered Questions</td>
						<td>Asked Questions</td>
					</tr>
				</thead>
				<tbody>
					{
						this.props.users.map(user => (
							<tr key={user.id}>
								<td><img src={user.avatar} alt='user profile pic' className='profilePic' /></td>
								<td>{ user.name }</td>
								<td>{ user.answers }</td>
								<td>{ user.questions }</td>
							</tr>
						))
					}
				</tbody>
			</table>
		)
	}
}

// Map State to Props
// Get the relevant details for each of the users
function mapStateToProps({ users }) {
	return {
		users: Object.values(users).map(user => {
			return {
				id: user.id,
				name: user.name,
				avatar: user.avatarURL,
				answers: Object.keys(user.answers).length,
				questions: user.questions.length
		}}).sort((user1, user2) => { 
			return ((user2.answers + user2.questions) - (user1.answers + user1.questions))
		})
	}
}

export default connect(mapStateToProps)(Leaderboard)