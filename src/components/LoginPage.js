import React from 'react';
import { connect } from 'react-redux';

class LoginPage extends React.Component {
	state = {
		userID: ''
	}

	// Render method
	render() {
		return (
			<form>
				<select value={this.state.userID}>
					<option value=''>Login as:</option>
					{
						this.props.users.map(user => (
							<option key={user.id} value={user.id}>{ user.name }</option>
						))
					}
				</select>
				<button>Login</button>
			</form>
		)
	}
}

// Map State to Props
// Gets the names and IDs of all users in the mock API's database
function mapStateToProps({ users }) {
	return {
		users: Object.entries(users).map(entry => {
			return {
				id: entry[0],
				name: entry[1].name
			}
		})
	}
}

export default connect(mapStateToProps)(LoginPage)