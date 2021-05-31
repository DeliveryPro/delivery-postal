import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

const asyncDispatchMiddleware = (store) => (next) => (action) => {
	let syncActivityFinished = false
	let actionQueue = []

	const flushQueue = () => {
		actionQueue.forEach((a) => store.dispatch(a))
		actionQueue = []
	}

	const asyncDispatch = (asyncAction) => {
		actionQueue = actionQueue.concat([asyncAction])

		if (syncActivityFinished) {
			flushQueue()
		}
	}

	const actionWithAsyncDispatch = { ...action, asyncDispatch }

	next(actionWithAsyncDispatch)
	syncActivityFinished = true
	flushQueue()
}

const middleware = [reduxThunk, asyncDispatchMiddleware]

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(...middleware)))

export default store
