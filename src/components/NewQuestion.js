// React / Redux imports
import React from 'react';
import { connect }  from 'react-redux';
import { withRouter } from 'react-router-dom';

// App imports
import { addQuestion } from '../actions/shared';

class NewQuestion extends React.Component {
	state = {
		optionOne: '',
		optionTwo: ''
	};
	
	/*
  	Function Name: updateOptionText()
  	Function Description: Updates the answer option as currently held by the component's state.
  	Parameters: newText (string) - the new value of the input field.
							textBox (string) - the ID of the input field.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	updateOptionText(newText, textBox) {
		// get the option to update; the ID of the text field minus the 'text' in the end
		const optionToUpdate = textBox.substring(0, textBox.length - 4);
		// set the state
		this.setState((currentState) => ({
			[optionToUpdate]: newText
		}))
	}

	/*
  	Function Name: checkEmptyFields()
  	Function Description: Checks whether one or both of the text fields is still empty. Used to disable the 'add question' button.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	checkEmptyFields = () => {
		return this.state.optionOne.length === 0 || this.state.optionTwo.length === 0;
	}
	
	/*
  	Function Name: addQuestion()
  	Function Description: Grabs the options the user typed into the text fields, dispatches a request to create a new question and redirects the user
											back to the home screen.
  	Parameters: event (event) - Form submission event.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	addQuestion(event) {
		event.preventDefault();
		
		// create the new question
		const newQuestion= {
			author: this.props.currentUser,
			optionOneText: this.state.optionOne,
			optionTwoText: this.state.optionTwo
		};
		
		this.props.dispatch(addQuestion(newQuestion));
		// redirect the user back to the home page
		this.props.history.push('/');
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
			<React.Fragment>
				<h2 id='addTitle'>Add Question</h2>
				<h3>Would you rather...</h3>
				<form onSubmit={(e) => ( this.addQuestion(e) )} id='newQuestion'>
					<label htmlFor='optionOneText'>Option One:</label>
					<input type='text' id='optionOneText' placeholder='option one' value={this.state.optionOne} onChange={(e) => ( this.updateOptionText(e.target.value, e.target.id) )} />
					<label htmlFor='optionTwoText'>Option Two:</label>
					<input type='text' id='optionTwoText' placeholder='option two' value={this.state.optionTwo} onChange={(e) => ( this.updateOptionText(e.target.value, e.target.id) )} />
					<button type='submit' disabled={this.checkEmptyFields()}>Add Question</button>
				</form>
			</React.Fragment>
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

export default connect(mapStateToProps)(withRouter(NewQuestion))