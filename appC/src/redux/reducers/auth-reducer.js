import { handleActions } from 'redux-actions'

import { loginSuccess, registerUserSuccess, logOutSuccess, checkUserAuthSuccess } from '../actions/auth-action'

const defaultState = {
    isAuth: false,
    uid: null,
}

const authReducer = handleActions(
    {
        [loginSuccess]: (state, { payload }) => ({
            ...state,
            isAuth: true,
            uid: payload,
        }),
        [registerUserSuccess]: (state) => ({
            ...state,
        }),
        [logOutSuccess]: () => ({
            ...defaultState,
        }),
        [checkUserAuthSuccess]: (_, { payload }) => ({
            isAuth: true,
            uid: payload,
        }),
    },
    defaultState,
)

export default authReducer
