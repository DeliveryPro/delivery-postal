import { handleActions } from 'redux-actions'

import {
	getSupportMessagesSuccess,
	getSupportMessagesStart,
	getOneSupportMessageStart,
	getOneSupportMessageSuccess,
} from '../actions/support-action'

const defaultState = {
	messages: {},
	loading: false,
	oneMessageLoading: false,
	message: {},
}

const notificationReducer = handleActions(
	{
		[getSupportMessagesSuccess]: (state, { payload }) => ({
			messages: { ...state.messages, ...payload },
			loading: false,
		}),
		[getSupportMessagesStart]: (state) => ({
			...state,
			loading: true,
		}),
		[getOneSupportMessageSuccess]: (state, { payload }) => ({
			...state,
			message: payload,
			oneMessageLoading: false,
		}),
		[getOneSupportMessageStart]: (state) => ({
			...state,
			oneMessageLoading: true,
		}),
	},
	defaultState,
)

export default notificationReducer
