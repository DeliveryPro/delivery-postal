import { createAction } from 'redux-actions'

import {
	CREATE_NEW_DELIVERY_SUCCESS,
	CREATE_NEW_DELIVERY_START,
	GET_ALL_USER_DELIVERY_SUCCESS,
	GET_ALL_USER_DELIVERY_START,
	GET_DELIVERY_SUCCESS,
	GET_DELIVERY_START,
	ADD_PACKAGE_TO_DELIVERY_SUCCESS,
	ADD_PACKAGE_TO_DELIVERY_START,
	GET_PACKAGE_DATA_SUCCESS,
	GET_PACKAGE_DATA_START,
	UPDATE_PACKAGE_DATA_IN_DELIVERY_SUCCESS,
	UPDATE_DELIVERY_STATUS_SUCCESS,
	UPDATE_DELIVERY_STATUS_START,
	UPDATE_DELIVERY_PACKAGE_STATUS_SUCCESS,
	UPDATE_DELIVERY_PACKAGE_STATUS_START,
	SET_MAP_ACTION_SUCCESS,
	CLEAR_MAP_ITEM_SUCCESS,
} from '../types'

import { errorHandler } from './error-action'
import logger from '../../utils/logger'
import { Delivery } from '../../api'

export const createNewDeliverySuccess = createAction(CREATE_NEW_DELIVERY_SUCCESS)
export const createNewDeliveryStart = createAction(CREATE_NEW_DELIVERY_START)

const CREATE_NEW_DELIVERY_PAGE = 'CREATE_NEW_DELIVERY_PAGE'

export const createNewDeliveryAction = (uid) => async (dispatch) => {
	logger('createNewDeliveryAction')
	dispatch(createNewDeliveryStart())
	try {
		const res = await Delivery.createNewDelivery(uid)
		if (res) {
			dispatch(createNewDeliverySuccess(res))
		}
	} catch (e) {
		logger('createNewDeliveryAction', e)
		dispatch(errorHandler(CREATE_NEW_DELIVERY_PAGE, e))
	}
}

export const getALlUserDeliverySuccess = createAction(GET_ALL_USER_DELIVERY_SUCCESS)
export const getALlUserDeliveryStart = createAction(GET_ALL_USER_DELIVERY_START)

export const getAllUserDeliveryAction = (uid) => async (dispatch) => {
	logger('getALlUserDeliveryAction')
	dispatch(getALlUserDeliveryStart())
	try {
		const res = await Delivery.getAllUserDelivery(uid)
		if (res) {
			console.log(` getALlUserDeliveryAction res`, res)
			dispatch(getALlUserDeliverySuccess(res))
		}
	} catch (e) {
		logger('getALlUserDeliveryAction', e)
		dispatch(errorHandler(CREATE_NEW_DELIVERY_PAGE, e))
	}
}

export const selectDeliverySuccess = createAction(GET_DELIVERY_SUCCESS)
export const selectDeliveryStart = createAction(GET_DELIVERY_START)

export const selectDeliveryAction = (deliveryId) => async (dispatch) => {
	logger('selectDeliveryAction')
	dispatch(selectDeliveryStart(deliveryId))
	try {
		const res = await Delivery.selectDelivery(deliveryId)
		if (res) {
			dispatch(selectDeliverySuccess(res))
		}
	} catch (e) {
		logger('selectDeliveryAction', e)
		dispatch(errorHandler(CREATE_NEW_DELIVERY_PAGE, e))
	}
}

export const addPackageToDeliverySuccess = createAction(ADD_PACKAGE_TO_DELIVERY_SUCCESS)
export const addPackageToDeliveryStart = createAction(ADD_PACKAGE_TO_DELIVERY_START)

export const addPackageToDeliveryAction = (deliveryId, packageId) => async (dispatch) => {
	logger('addPackageToDeliveryAction')
	dispatch(addPackageToDeliveryStart(packageId))
	try {
		dispatch(getPackageDataAction(packageId, deliveryId))
		const res = await Delivery.addPackageToDelivery(deliveryId, packageId)
		if (res) {
			dispatch(addPackageToDeliverySuccess(packageId))
		}
	} catch (e) {
		logger('addPackageToDeliveryAction', e)
		dispatch(errorHandler(CREATE_NEW_DELIVERY_PAGE, e))
	}
}

export const updatePackageDataInDeliverySuccess = createAction(UPDATE_PACKAGE_DATA_IN_DELIVERY_SUCCESS)

export const updatePackageDataInDelivery =
	({ deliveryId, data }) =>
	async (dispatch) => {
		logger('updatePackageDataInDelivery')
		try {
			const res = await Delivery.updatePackageDataInDelivery({ deliveryId, data })
			if (res) {
				dispatch(updatePackageDataInDeliverySuccess())
			}
		} catch (e) {
			logger('updatePackageDataInDelivery', e)
			dispatch(errorHandler(CREATE_NEW_DELIVERY_PAGE, e))
		}
	}

export const getPackageDataSuccess = createAction(GET_PACKAGE_DATA_SUCCESS)
export const getPackageDataStart = createAction(GET_PACKAGE_DATA_START)

export const getPackageDataAction = (packageId, deliveryId) => async (dispatch) => {
	logger('getPackageDataAction')
	dispatch(getPackageDataStart(packageId))
	try {
		const res = await Delivery.getPackageData(packageId)
		if (res) {
			dispatch(updatePackageDataInDelivery({ deliveryId, data: res }))
			dispatch(getPackageDataSuccess(res))
		}
	} catch (e) {
		logger('getPackageDataAction', e)
		dispatch(errorHandler(CREATE_NEW_DELIVERY_PAGE, e))
	}
}

export const updateDeliveryStatusSuccess = createAction(UPDATE_DELIVERY_STATUS_SUCCESS)
export const updateDeliveryStatusStart = createAction(UPDATE_DELIVERY_STATUS_START)

export const updateDeliveryStatusAction = (deliveryId, status) => async (dispatch) => {
	logger('updateDeliveryStatusAction')
	dispatch(updateDeliveryStatusStart(deliveryId))
	try {
		const res = await Delivery.updateDeliveryStatus({ deliveryId, status })
		if (res) {
			dispatch(updateDeliveryStatusSuccess(res))
		}
	} catch (e) {
		logger('updateDeliveryStatusAction', e)
		dispatch(errorHandler(CREATE_NEW_DELIVERY_PAGE, e))
	}
}

export const updateDeliveryPackageSuccess = createAction(UPDATE_DELIVERY_PACKAGE_STATUS_SUCCESS)
export const updateDeliveryPackageStart = createAction(UPDATE_DELIVERY_PACKAGE_STATUS_START)

export const updateDeliveryPackageAction =
	({ deliveryId, packageId, status }) =>
	async (dispatch) => {
		logger('updateDeliveryPackageAction', packageId)
		dispatch(updateDeliveryPackageStart())
		try {
			const res = await Delivery.updateDeliveryPackageStatus({ deliveryId, packageId, status })
			if (res) {
				dispatch(updateDeliveryPackageSuccess({ packageId, status }))
			}
		} catch (e) {
			logger('updateDeliveryPackageAction', e)
			dispatch(errorHandler(CREATE_NEW_DELIVERY_PAGE, e))
		}
	}

export const setMapItemSuccess = createAction(SET_MAP_ACTION_SUCCESS)

export const setMapItemAction = (data) => (dispatch) => {
	logger('setMapItemAction', data)
	dispatch(setMapItemSuccess(data))
}

export const clearMapItemSuccess = createAction(CLEAR_MAP_ITEM_SUCCESS)

export const clearMapItem = () => (dispatch) => {
	logger('setMapItemAction', data)
	dispatch(clearMapItemSuccess())
}
