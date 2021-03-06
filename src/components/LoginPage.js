// React / Redux imports
import React from 'react';
import { connect } from 'react-redux';

// App imports
import { login } from '../actions/currentUser';

class LoginPage extends React.Component {
	state = {
		userID: ''
	}

	// CTOR
	constructor(props) {
		super(props);
		this.onUpdate = this.updateID.bind(this);
		this.onSubmit = this.logIn.bind(this);
	}
	
	/*
  	Function Name: updateID()
  	Function Description: Update the currently selected user ID for login.
  	Parameters: event (event) - <select> event.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	updateID(event) {
		this.setState({
			userID: event.target.value
		});
	}
	
	/*
  	Function Name: logIn()
  	Function Description: Dispatches a request to login by changing the value of currentUser in the Store.
  	Parameters: event (event) - login button click event.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	logIn(event) {
		event.preventDefault();
		this.props.dispatch(login(this.state.userID));
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
			<form onSubmit={this.onSubmit} id='loginForm'>
				<select value={this.state.userID} onChange={this.onUpdate}>
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