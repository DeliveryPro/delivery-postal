import { createSelector } from 'reselect'

const authState = (state) => state.auth 

export const isUserAuthSelector = createSelector(authState, ({ isAuth }) => isAuth)
