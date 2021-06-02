import {
	createNewDeliverySuccess,
	createNewDeliveryStart,
	getALlUserDeliverySuccess,
	selectDeliverySuccess,
	selectDeliveryStart,
	addPackageToDeliverySuccess,
	getPackageDataSuccess,
} from '../actions/delivery-action'

import { handleActions } from 'redux-actions'

const defaultState = {
	deliveryId: '',
	delivery: {
		packages: null,
	},
	ids: {},
}

const deliveryReducer = handleActions(
	{
		[createNewDeliveryStart]: (state) => ({
			...state,
		}),
		[createNewDeliverySuccess]: (state, { payload }) => ({
			...state,
			deliveryId: payload,
		}),
		[getALlUserDeliverySuccess]: (state, { payload }) => ({
			...state,
			ids: payload,
		}),
		[selectDeliveryStart]: (state, { payload }) => ({
			...state,
			deliveryId: payload,
		}),
		[selectDeliverySuccess]: (state, { payload }) => ({
			...state,
			delivery: payload,
		}),
		[addPackageToDeliverySuccess]: (state, { payload }) => ({
			...state,
			delivery: {
				packages: { ...state.delivery.packages, ...payload },
			},
		}),
		[getPackageDataSuccess]: (state, { payload }) => ({
			...state,
			delivery: {
				packages: { ...state.delivery.packages, ...payload },
			},
		}),
	},
	defaultState,
)

export default deliveryReducer
