import { ExternalApi, Users, Photo } from '../../api'
import { createAction } from 'redux-actions'
import logger from '../../utils/logger'

import {
	SEND_NEW_CREDENTIALS_START,
	SEND_NEW_CREDENTIALS_SUCCESS,
	GET_USER_DATA_START,
	GET_USER_DATA_SUCCESS,
	UPDATE_USER_DATA_START,
	UPDATE_USER_DATA_SUCCESS,
	UPDATE_USER_PHOTO_START,
	UPDATE_USER_PHOTO_SUCCESS,
	SEND_USER_POSITION_START,
	SEND_USER_POSITION_SUCCESS,
	UPDATE_USER_DELIVERY_START,
	UPDATE_USER_DELIVERY_SUCCESS,
} from '../types'
import { errorHandler } from './error-action'

const USERS_PAGE = 'USERS_PAGE'

export const getUserDataStart = createAction(GET_USER_DATA_START)
export const getUserDataSuccess = createAction(GET_USER_DATA_SUCCESS)

export const getUserDataAction = (userId) => async (dispatch) => {
	logger('getUserDataAction')
	dispatch(getUserDataStart())
	try {
		const res = await Users.getUser(userId)
		if (res) dispatch(getUserDataSuccess(res))
	} catch (e) {
		dispatch(errorHandler(USERS_PAGE, e))
	}
}

export const updateUserStart = createAction(UPDATE_USER_DATA_START)
export const updateUserSuccess = createAction(UPDATE_USER_DATA_SUCCESS)

export const updateUserAction = (userId, data) => async (dispatch) => {
	logger('updateUserAction')
	dispatch(updateUserStart())
	try {
		const res = await Users.updateUser(userId, data)
		if (res) dispatch(updateUserSuccess(res))
	} catch (e) {
		dispatch(errorHandler(USERS_PAGE, e))
	}
}

export const updateUserPhotoStart = createAction(UPDATE_USER_PHOTO_START)
export const updateUserPhotoSuccess = createAction(UPDATE_USER_PHOTO_SUCCESS)

export const updateUserPhotoAction = (uid, data) => async (dispatch) => {
	logger('updateUserPhotoAction')
	dispatch(updateUserPhotoStart())
	try {
		const photo_link = await Photo.uploadPhoto(uid, data)
		if (photo_link) {
			dispatch(updateUserAction(uid, { photo: photo_link }))
			dispatch(updateUserPhotoSuccess())
		}
	} catch (e) {
		dispatch(errorHandler(USERS_PAGE, e))
	}
}

export const sendNewCredentialsStart = createAction(SEND_NEW_CREDENTIALS_START)
export const sendNewCredentialsSuccess = createAction(SEND_NEW_CREDENTIALS_SUCCESS)

export const sendNewCredentialsAction = (data) => async (dispatch) => {
	logger('sendNewCredentialsAction')
	dispatch(sendNewCredentialsStart())
	try {
		const res = await ExternalApi.passwordRestore(data)
		if (res) dispatch(sendNewCredentialsSuccess(res))
	} catch (e) {
		dispatch(errorHandler(USERS_PAGE, e))
	}
}

export const sendUserPositionStart = createAction(SEND_USER_POSITION_START)
export const sendUserPositionSuccess = createAction(SEND_USER_POSITION_SUCCESS)

export const sendUserPositionAction = (userId, data) => async (dispatch) => {
	logger('sendUserPositionAction')
	dispatch(sendUserPositionStart())
	try {
		Users.updateUserPosition(userId, data)
		dispatch(sendUserPositionSuccess(data))
	} catch (e) {
		dispatch(errorHandler(USERS_PAGE, e))
	}
}

export const updateUserDeliveriesStart = createAction(UPDATE_USER_DELIVERY_START)
export const updateUserDeliveriesSuccess = createAction(UPDATE_USER_DELIVERY_SUCCESS)

export const updateUserDeliveriesAction = (userId, packageId) => async (dispatch) => {
	logger('updateUserDeliveriesAction')
	dispatch(updateUserDeliveriesStart())
	try {
		const res = await Users.addNewUserDelivery(userId, packageId)
		if (res) dispatch(updateUserDeliveriesSuccess(res))
	} catch (e) {
		dispatch(errorHandler(USERS_PAGE, e))
	}
}
