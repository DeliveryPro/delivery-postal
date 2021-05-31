import { createAction } from 'redux-actions'

import {
    LOGIN_SUCCESS,
    LOGIN_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_START,
    LOG_OUT_SUCCESS,
    CHECK_USER_AUTH_SUCCESS,
} from '../types'

import { errorHandler } from './error-action'
import logger from '../../utils/logger'
import { ExternalApi } from '../../api'
import AsyncStorageUtils from '../../utils/asyncStorageWorker'
import AsyncStorageKeys from '../../constants/asyncStorageKeys'

export const loginSuccess = createAction(LOGIN_SUCCESS)
export const loginStart = createAction(LOGIN_START)

const LOGIN_PAGE = 'LOGIN_PAGE'

export const loginWithEmailAction = (data) => async (dispatch) => {
    logger('loginWithEmailAction')
    dispatch(loginStart())
    try {
        const res = await ExternalApi.loginWithEmail(data)
        if (res) {
            AsyncStorageUtils._store({ key: AsyncStorageKeys.UID, data: res.uid })
            dispatch(loginSuccess(res.uid))
        }
    } catch (e) {
        dispatch(errorHandler(LOGIN_PAGE, e))
    }
}

export const registerUserSuccess = createAction(REGISTER_USER_SUCCESS)
export const registerUserStart = createAction(REGISTER_USER_START)

export const registerUserWithEmailAction = (data) => async (dispatch) => {
    logger('registerUserWithEmailAction')
    dispatch(registerUserStart())
    try {
        const res = await ExternalApi.registerUser(data)
        if (res) {
            dispatch(registerUserSuccess())
        }
    } catch (e) {
        dispatch(errorHandler(LOGIN_PAGE, e))
    }
}

export const logOutSuccess = createAction(LOG_OUT_SUCCESS)

export const logOutUserAction = () => (dispatch) => {
    logger('logOutUserAction')
    AsyncStorageUtils._remove(AsyncStorageKeys.UID)
    dispatch(logOutSuccess())
}

export const checkUserAuthSuccess = createAction(CHECK_USER_AUTH_SUCCESS)

export const checkUserAuthAction = () => async (dispatch) => {
    logger('checkUserAuthAction')
    try {
        const res = await AsyncStorageUtils._get(AsyncStorageKeys.UID)
        if (res) dispatch(checkUserAuthSuccess(res))
    } catch (e) {
        dispatch(errorHandler(LOGIN_PAGE, e))
    }
}
