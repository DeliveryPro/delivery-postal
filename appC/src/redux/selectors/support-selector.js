import { createSelector } from 'reselect'

const supportState = (state) => state.support

export const getAllSupportMessagesSelector = createSelector(supportState, ({ messages }) => messages)

export const isSupportMessagesLoadingSelector = createSelector(supportState, ({ loading }) => loading)

export const getSupportMessageSelector = createSelector(supportState, ({ message }) => message)

export const isOneSupportMessagesLoadingSelector = createSelector(supportState, ({ oneMessageLoading }) => oneMessageLoading)