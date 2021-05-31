import { createAction } from 'redux-actions'

import {
    CREATE_NEW_DELIVERY_SUCCESS,
    CREATE_NEW_DELIVERY_START,
    GET_LIST_OF_USER_DELIVERY_SUCCESS,
    GET_LIST_OF_USER_DELIVERY_START,
    SUBSCRIBE_TO_DELIVERY_CHANGES_SUCCESS,
    SUBSCRIBE_TO_DELIVERY_CHANGES_START,
    PACKAGE_UPDATE_SUCCESS,
    CLEAR_NEW_DELIVERY_SUCCESS,
} from '../types'

import { errorHandler } from './error-action'
import logger from '../../utils/logger'
import { Delivery } from '../../api'

export const createNewDeliverySuccess = createAction(CREATE_NEW_DELIVERY_SUCCESS)
export const createNewDeliveryStart = createAction(CREATE_NEW_DELIVERY_START)

const CREATE_NEW_DELIVERY_PAGE = 'CREATE_NEW_DELIVERY_PAGE'

export const createNewDeliveryAction = (uid, data) => async (dispatch) => {
    logger('createNewDeliveryAction')
    dispatch(createNewDeliveryStart())
    try {
        const res = await Delivery.createNew(uid, data)
        if (res) {
            dispatch(createNewDeliverySuccess())
        }
    } catch (e) {
        logger('createNewDeliveryAction', e)
        dispatch(errorHandler(CREATE_NEW_DELIVERY_PAGE, e))
    }
}

export const clearNewDeliverySuccess = createAction(CLEAR_NEW_DELIVERY_SUCCESS)

export const clearNewDeliveryAction = () => (dispatch) => {
    logger('clearNewDeliveryAction')
    dispatch(clearNewDeliverySuccess())
}

export const subscribeToDeliveryChangeSuccess = createAction(SUBSCRIBE_TO_DELIVERY_CHANGES_SUCCESS)
export const subscribeToDeliveryChangeStart = createAction(SUBSCRIBE_TO_DELIVERY_CHANGES_START)

export const packageUpdatedSuccess = createAction(PACKAGE_UPDATE_SUCCESS)

const SUBSCRIBE_TO_USER_PACKAGES = 'SUBSCRIBE_TO_USER_PACKAGES'

export const subscribeToDeliveryChangeAction = (uid) => (dispatch) => {
    logger('subscribeToDeliveryChangeAction', uid)
    dispatch(subscribeToDeliveryChangeStart())
    try {
        const onChangedItem = (data) => dispatch(packageUpdatedSuccess(data))
        Delivery.subscribeOnChange(uid, onChangedItem)
        dispatch(subscribeToDeliveryChangeSuccess())
    } catch (e) {
        logger('subscribeToDeliveryChangeAction', e)
        dispatch(errorHandler(SUBSCRIBE_TO_USER_PACKAGES, e))
    }
}

export const subscribeToDeliveryCreateAction = uid => dispatch => {
    logger('subscribeToDeliveryCreateAction', uid)
    try {
        const onAddItem = (data) => dispatch(packageUpdatedSuccess(data))
        Delivery.subscribeOnAdd(uid, onAddItem)
        dispatch(subscribeToDeliveryChangeSuccess())
    } catch (e) {
        logger('subscribeToDeliveryChangeAction', e)
        dispatch(errorHandler(SUBSCRIBE_TO_USER_PACKAGES, e))
    }
}

export const getListOfUserDeliverySuccess = createAction(GET_LIST_OF_USER_DELIVERY_SUCCESS)
export const getListOfUserDeliveryStart = createAction(GET_LIST_OF_USER_DELIVERY_START)

export const getListOfUserDeliveryAction = (uid) => async (dispatch) => {
    logger('getListOfUserDeliveryAction')
    try {
        const res = await Delivery.getList(uid)
        if (!res) return

        dispatch(getListOfUserDeliverySuccess(res))
        dispatch(subscribeToDeliveryChangeAction(uid))
        dispatch(subscribeToDeliveryCreateAction(uid))
    } catch (e) {
        logger('getListOfUserDeliveryAction', e)
        // dispatch(errorHandler(CREATE_NEW_DELIVERY, e))
    }
}
