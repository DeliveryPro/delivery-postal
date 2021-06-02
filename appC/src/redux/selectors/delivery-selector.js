import { createSelector } from 'reselect'

const deliveryState = (state) => state.delivery

export const getDeliveryIdSelector = createSelector(deliveryState, ({ deliveryId }) => deliveryId)

export const getAllDeliveriesSelector = createSelector(deliveryState, ({ ids }) => ids)

export const getDeliveryDataByIdSelector = createSelector(deliveryState, ({ delivery }) => delivery)
