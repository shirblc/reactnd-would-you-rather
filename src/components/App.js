// React / Redux imports
import React from 'react';
import { getInitialData as getQuestions } from '../actions/questions';
import { getInitialData as getUsers } from '../actions/users';
import { connect } from 'react-redux';

// App imports
import './App.css';
import Home from './Home';
import LoginPage from './LoginPage';

class App extends React.Component {
	componentDidMount() {
		this.props.dispatch(getQuestions());
		this.props.dispatch(getUsers());
	}
	
	render() {
		 return (
			 <div className="App">
				 Would You Rather
				 {
					// if the data was fetched from the API into the state, check for currently logged in user
					this.props.loading === false && (
						this.props.currentUser 
						? <Home userID={this.props.currentUser}/>
						: <LoginPage />
					)
				 }
			 </div>
		 );
	}
}

// Map State to Props
// Checks whether users' data has been fetched and whether there's a logged in user
function mapStateToProps({users, currentUser}) {
	return {
		loading: Object.keys(users).length === 0,
		currentUser: currentUser
	}
}

export default connect(mapStateToProps)(App);
