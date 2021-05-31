import { Support, ExternalApi } from '../../api'
import { createAction } from 'redux-actions'
import logger from '../../utils/logger'

import {
	GET_ONE_SUPPORT_MESSAGE_START,
	GET_ONE_SUPPORT_MESSAGE_SUCCESS,
	GET_SUPPORT_MESSAGES_START,
	GET_SUPPORT_MESSAGES_SUCCESS,
} from '../types'
import { errorHandler } from './error-action'

export const getSupportMessagesStart = createAction(GET_SUPPORT_MESSAGES_START)
export const getSupportMessagesSuccess = createAction(GET_SUPPORT_MESSAGES_SUCCESS)

const SUPPORT_PAGE = 'SUPPORT_PAGE'

export const getSupportMessagesAction = () => async (dispatch) => {
	logger('getSupportMessagesAction')
	dispatch(getSupportMessagesStart())
	try {
		const res = await Support.getSupportMessages()
		if (res) {
			dispatch(getSupportMessagesSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(SUPPORT_PAGE, e))
	}
}

const SUPPORT_PAGE_ANSWER = 'SUPPORT_PAGE_ANSWER'

export const getOneSupportMessageStart = createAction(GET_ONE_SUPPORT_MESSAGE_START)
export const getOneSupportMessageSuccess = createAction(GET_ONE_SUPPORT_MESSAGE_SUCCESS)

export const getOneSupportMessageAction = (id) => async (dispatch) => {
	logger('getOneSupportMessage', id)
	dispatch(getOneSupportMessageStart())
	try {
		const res = await Support.getOneSupportMessage(id)
		if (res) {
			dispatch(getOneSupportMessageSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(SUPPORT_PAGE_ANSWER, e))
	}
}

export const updateAnswerAction = (data) => async (dispatch) => {
	logger('updateAnswerAction')
	dispatch(getOneSupportMessageStart())
	try {
		const res = await ExternalApi.addAnswer(data)
		if (res) {
			dispatch(getOneSupportMessageSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(SUPPORT_PAGE_ANSWER, e))
	}
}
