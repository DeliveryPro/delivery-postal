import {
	createNewDeliverySuccess,
	createNewDeliveryStart,
	getALlUserDeliverySuccess,
	selectDeliverySuccess,
	selectDeliveryStart,
	addPackageToDeliverySuccess,
	getPackageDataSuccess,
	updateDeliveryPackageSuccess,
	clearMapItemSuccess,
	setMapItemSuccess,
} from '../actions/delivery-action'

import { handleActions } from 'redux-actions'

const defaultState = {
	deliveryId: '',
	delivery: {
		packages: {},
		status: '',
	},
	ids: {},
	mapItem: {},
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
		[updateDeliveryPackageSuccess]: (state, { payload }) => ({
			...state,
			delivery: {
				packages: {
					...state.delivery.packages,
					[payload.packageId]: { ...state.delivery.packages[payload.packageId], ...payload },
				},
			},
		}),
		[setMapItemSuccess]: (state, { payload }) => ({
			...state,
			mapItem: payload,
		}),
		[clearMapItemSuccess]: (state) => ({
			...state,
			mapItem: {},
		}),
	},
	defaultState,
)

export default deliveryReducer
