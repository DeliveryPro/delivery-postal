import { createSelector } from 'reselect'

const userState = (state) => state.user
const authState = (state) => state.auth

export const getUserIdSelector = createSelector(authState, ({ uid }) => uid)

export const getUserDataSelector = createSelector(userState, ({ data }) => data)

export const userPositionSelector = createSelector(userState, ({ userPosition }) => userPosition)
