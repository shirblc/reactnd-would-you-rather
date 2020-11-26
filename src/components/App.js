// React / Redux imports
import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// App imports
import './App.css';
import Home from './Home';
import LoginPage from './LoginPage';
import Question from './Question';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import { getInitialData as getQuestions } from '../actions/questions';
import { getInitialData as getUsers } from '../actions/users';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

// Font Awesome library init
library.add(faArrowLeft, faCheck);

class App extends React.Component {
	/*
  	Function Name: componentDidMount()
  	Function Description: Dispatches an action to get the questions and users upon inserting the component into the DOM. This method is automatically triggered by React.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	componentDidMount() {
		this.props.dispatch(getQuestions());
		this.props.dispatch(getUsers());
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
			 <div className="App">
				 <div className="App-header">
					 <h1>Would You Rather</h1>
					 <nav role='navigation'>
						 <Link to='/' className='navLink'>Home</Link>
						 <Link to='/add' className='navLink'>Add Question</Link>
						 <Link to='/leaderboard' className='navLink'>Leaderboard</Link>
					 </nav>
				 </div>
				 {
					// if the data was fetched from the API into the state, check for currently logged in user
					this.props.loading === false && (
						this.props.currentUser 
						? <div className="content">
							<Route exact path='/' component={Home} />
							<Route path='/question/:id' component={Question} />
							<Route path='/add' component={NewQuestion} />
							<Route path='/leaderboard' component={Leaderboard} />
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
