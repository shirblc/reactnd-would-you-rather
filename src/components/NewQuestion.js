import React from 'react';
import { connect }  from 'react-redux';

class NewQuestion extends React.Component {
	state = {
		optionOne: '',
		optionTwo: ''
	};
	
	// render method
	render() {
		return (
			<form>
				<label for='optionOneText'>Option one:</label>
				<input type='text' id='optionOneText' placeholder='option one' value={this.state.optionOne} />
				<label for='optionTwoText'>Option one:</label>
				<input type='text' id='optionTwoText' placeholder='option two' value={this.state.optionTwo} />
				<button type='submit'>Add Question</button>
			</form>
		)
	}
}

// Map State to Props
// Get the ID of the currently logged in user
function mapStateToProps({ currentUser }) {
	return {
		currentUser: currentUser
	}
}

export default connect(mapStateToProps)(NewQuestion)