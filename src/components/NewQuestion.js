import React from 'react';
import { connect }  from 'react-redux';
import { addQuestion } from '../actions/shared';

class NewQuestion extends React.Component {
	state = {
		optionOne: '',
		optionTwo: ''
	};
	
	// update the answer option as currently held by the component's state
	updateOptionText(newText, textBox) {
		// get the option to update; the ID of the text field minus the 'text' in the end
		const optionToUpdate = textBox.substring(0, textBox.length - 4);
		// set the state
		this.setState((currentState) => ({
			[optionToUpdate]: newText
		}))
	}
	
	// add the new question
	addQuestion(event) {
		event.preventDefault();
		
		// create the new question
		const newQuestion= {
			author: this.props.currentUser,
			optionOneText: this.state.optionOne,
			optionTwoText: this.state.optionTwo
		};
		
		this.props.dispatch(addQuestion(newQuestion));
	}
	
	// render method
	render() {
		return (
			<form onSubmit={(e) => ( this.addQuestion(e) )}>
				<label htmlFor='optionOneText'>Option one:</label>
				<input type='text' id='optionOneText' placeholder='option one' value={this.state.optionOne} onChange={(e) => ( this.updateOptionText(e.target.value, e.target.id) )} />
				<label htmlFor='optionTwoText'>Option one:</label>
				<input type='text' id='optionTwoText' placeholder='option two' value={this.state.optionTwo} onChange={(e) => ( this.updateOptionText(e.target.value, e.target.id) )} />
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