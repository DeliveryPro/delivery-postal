import React, { useEffect, useState } from 'react'
import {
	FlatList,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Permission,
	PermissionsAndroid,
	ToastAndroid,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Geolocation from 'react-native-geolocation-service'
import LoaderContainer from '../components/Loader'
import NoPackages from '../components/NoPackages'
import Tabs from '../components/Tabs'
import { MAIN } from '../constants/pages'
import {
	createNewDeliveryAction,
	getAllUserDeliveryAction,
	getListOfUserDeliveryAction,
} from '../redux/actions/delivery-action'
import { sendUserPositionAction, updateUserAction, updateUserDeliveriesAction } from '../redux/actions/user-action'
import {
	getAllDeliveriesSelector,
	getDeliveryIdSelector,
	getPackagesStateSelector,
} from '../redux/selectors/delivery-selector'
import { getUserIdSelector } from '../redux/selectors/user-selector'
import Button from '../components/Button'
import DeliveryItem from '../components/DeliveryItem'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		position: 'relative',
	},
	container: {
		display: 'flex',
		flex: 1,
		paddingBottom: 80,
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 100,
		left: '15%',
	},
}))

const packages = [
	{
		id: '123132',
		status: 'in progress',
		from: 'City 1',
		to: 'City 2',
		description: 'Test package Test package Test package Test package Test package',
	},
	{ id: '123133', status: 'in progress', from: 'City 1', to: 'City 2', description: 'Test package' },
	{ id: '123141', status: 'delivered', from: 'City 1', to: 'City 2', description: 'Test package' },
	{ id: '123142', status: 'delivered', from: 'City 1', to: 'City 2', description: 'Test package' },
]

// const packages = []
let counter = 0

const Home = (props) => {
	const classes = useStyles()
	const loading = false

	const dispatch = useDispatch()
	const uid = useSelector(getUserIdSelector)
	const deliveryId = useSelector(getDeliveryIdSelector)

	const deliveries = useSelector(getAllDeliveriesSelector)
	// const { data, isLoading, queried } = useSelector(getPackagesStateSelector)

	useEffect(() => {
		setInterval(() => sendData(), 10000)
	}, [])

	const checkPermission = async () => {
		const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

		if (hasPermission) {
			return true
		}

		const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

		if (status === PermissionsAndroid.RESULTS.GRANTED) {
			return true
		}

		if (status === PermissionsAndroid.RESULTS.DENIED) {
			ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG)
		} else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
			ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG)
		}
	}

	useEffect(() => {
		dispatch(getAllUserDeliveryAction(uid))
	}, [])

	useEffect(() => {
		checkIsAvailableNew()
	}, [deliveries])

	useEffect(() => {
		deliveryId.length && dispatch(updateUserDeliveriesAction(uid, deliveryId))
	}, [deliveryId])

	const sendData = async () => {
		const hasLocationPermission = await checkPermission()
		if (hasLocationPermission) {
			Geolocation.getCurrentPosition(
				({ coords }) => {
					const t = {
						...coords,
						longitude: 36.22 + counter,
					}
					console.log('coords=>', t)
					dispatch(
						sendUserPositionAction(uid, {
							coords: { ...coords, longitude: 36.22 + counter },
						}),
					)
					counter += 0.0001
				},
				(error) => {
					// See error code charts below.
					console.log(error.code, error.message)
				},
				{ enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
			)
		}
	}
	const checkIsAvailableNew = () => {
		Object.values(deliveries).map(({ status }) => {
			console.log('status => ', status)
		})
	}

	// console.log(`interval`, interval)
	const createNewDelivery = () => {
		dispatch(createNewDeliveryAction(uid))
	}

	return (
		<View style={classes.root}>
			<SafeAreaView style={classes.container}>
				{loading && <LoaderContainer />}
				<View style={classes.buttonContainer}>
					<Button onPress={createNewDelivery} text="Create New Delivery" />
				</View>

				{Object.keys(deliveries)?.length ? (
					<FlatList
						data={Object.values(deliveries)}
						renderItem={(data) => <DeliveryItem {...data} {...props} />}
						keyExtractor={(item) => item.id}
					/>
				) : (
					<NoPackages />
				)}
			</SafeAreaView>
			<Tabs activeScreen={MAIN} {...props} />
		</View>
	)
}

export default Home
