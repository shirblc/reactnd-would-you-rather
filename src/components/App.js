// React / Redux imports
import React from 'react';
import { getInitialData as getQuestions } from '../actions/questions';
import { getInitialData as getUsers } from '../actions/users';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// App imports
import './App.css';
import Home from './Home';
import LoginPage from './LoginPage';
import Question from './Question';
import NewQuestion from './NewQuestion';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowLeft, faCheck);

class App extends React.Component {
	componentDidMount() {
		this.props.dispatch(getQuestions());
		this.props.dispatch(getUsers());
	}
	
	render() {
		 return (
			 <div className="App">
				 <div className="App-header">
					 <h1>Would You Rather</h1>
				 </div>
				 {
					// if the data was fetched from the API into the state, check for currently logged in user
					this.props.loading === false && (
						this.props.currentUser 
						? <div className="content">
							<Route exact path='/' component={Home} />
							<Route path='/question/:id' component={Question} />
							<Route path='/add' component={NewQuestion} />
						</div>
						: <div className="content">
							<LoginPage />
						</div>
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
