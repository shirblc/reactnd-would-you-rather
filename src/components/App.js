import React from 'react';
import './App.css';
import { getInitialData as getQuestions } from '../actions/questions';
import { getInitialData as getUsers } from '../actions/users';
import { connect } from 'react-redux';

class App extends React.Component {
	componentDidMount() {
		this.props.dispatch(getQuestions());
		this.props.dispatch(getUsers());
	}
	
	render() {
		 return (
			 <div className="App">
				 Would You Rather
			 </div>
		 );
	}
}

export default connect()(App);
