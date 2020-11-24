# Would You Rather

## Description

Would You Rather is a game in which the user has to choose one of two options. This React-based version includes questions on various topics.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

- Node.js

## Installaton and Usage

1. Download or clone the repo.
2. cd into the project directory.
3. Run ```npm install``` to install dependencies.
4. Run ```npm start``` to start the server.
5. Open ```http://localhost:3000``` and start playing!

## Contents

The project contains a number of important files:

1. **_DATA.JS** - The mock backend. Check [this part](#mock-server) for more details.
2. **index.js** - the base JavaScript file, which renders the whole app.

### Actions

**Located in:** [src/actions](./src/actions) 

Contains the Redux store actions required to run the app. Actions are divided into three files (mirroring the three parts of the store):

1. **currentUser.js** - Contains actions relating to the currently logged in user, such as login and logout.
2. **questions.js** - Contains actions relating to the game questions, such as adding initial data and adding new questions.
3. **users.js** - Contains actions relating to the list of currently registered users, such as getting initial data.

### Components

**Located in:** [src/components](./src/components)

Contains the app's components. These include:

1. **App.js** (as well as App.css and App.test.js) - The App component. Includes all components in the app.
2. **Home.js** - The Home component. Displays a list of links to answered and unanswered questions to the logged-in user.
3. **LoginPage.js** - The LoginPage component. Contains a login page in which the user can set the currentUser.
4. **Question.js** The Question component. Contains a Would You Rather question.

### Middleware

**Located in:** [src/middleware](./src/middleware) 

Contains the middleware used by this app's store. As of right now, includes two files:

1. **index.js** - The entry point for middleware; contains the Redux `applyMiddleware` call, which applies thunk (from Redux-Thunk) and any middleware in this directory.
2. **logger.js** - A logger middleware (for development only!). Logs actions and current store state to the console.

### Reducers

**Located in:** [src/reducers](./src/reducers) 

Contains the reducers used by this app's store. There are currently three reducers, mirroring the three parts of the store, as well as an entry point:

1. **currentUser.js** - Contains the reducer updating currently logged in user. Responsible for the 'currentUser' part of the store.
2. **index.js** - Entry point for reducers. Contains the `combineReducers` call, combining the three reducers and returning a single reducer to be used by the store.
3. **questions.js** - Contains the reducer updating the list of game questions. Responsible for the 'questions' part of the store.
4. **users.js** - Contains the reducer updating the list of registered users. Responsible for the 'users' part of the store.

## Dependencies

This project utilises several dependencies:

1. **react** - the React framework.
2. **react-dom** - React's package of DOM-specific methods.
3. **react-scripts** - Configuration and scripts for Create React App (the base of this project).
4. **redux** and **react-redux** - Redux store and React-specific Redux bindings.
5. **react-router-dom** - React's router.
6. **redux-thunk** - A Redux middleware for handling asynchronous requests.

## Mock-Server

The `_DATA.js` file represents a fake database and methods that let you access the data. The only thing you need to edit in the ` _DATA.js` file is the value of `avatarURL`. Each user should have an avatar, so you’ll need to add the path to each user’s avatar.

Mock server provided by Udacity (see original [here](https://github.com/udacity/reactnd-project-would-you-rather-starter)).

### Data

There are two types of objects stored in our database:

* Users
* Questions

#### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

#### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

#### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

## Create React App

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Known Issues

There are no current issues at the time.
