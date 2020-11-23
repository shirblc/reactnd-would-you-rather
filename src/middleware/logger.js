const logger = (store) => (next) => (action) => {
	console.group(action.type);
		console.log('action ' + action.type)
		const nextState = next(action);
		console.log('final state: ', store.getState())
	console.groupEnd();
	
	return nextState;
}

export default logger;