import { handleActions } from 'redux-actions'

import {
    sendNewCredentialsStart,
    sendNewCredentialsSuccess,
    getUserDataStart,
    getUserDataSuccess,
    updateUserStart,
    updateUserSuccess,
    updateUserPhotoStart,
    updateUserPhotoSuccess,
} from '../actions/user-action'

const defaultState = {
    loading: false,
    isUserLoading: false,
    isCredentialSending: false,
    isUserPhotoUploading: false,
    data: {},
}

const notificationReducer = handleActions(
    {
        [sendNewCredentialsStart]: (state) => ({
            ...state,
            isCredentialSending: true,
        }),
        [sendNewCredentialsSuccess]: (state) => ({
            ...state,
            isCredentialSending: false,
        }),
        [getUserDataStart]: (state) => ({
            ...state,
            isUserLoading: true,
        }),
        [getUserDataSuccess]: (state, { payload }) => ({
            ...state,
            isUserLoading: false,
            data: payload || {},
        }),
        [updateUserStart]: (state) => ({
            ...state,
            isUserLoading: true,
        }),
        [updateUserSuccess]: (state, { payload }) => ({
            ...state,
            isUserLoading: false,
            data: payload || {},
        }),
        [updateUserPhotoStart]: (state) => ({
            ...state,
            isUserPhotoUploading: true,
        }),
        [updateUserPhotoSuccess]: (state) => ({
            ...state,
            isUserPhotoUploading: false,
        }),
    },
    defaultState,
)

export default notificationReducer
