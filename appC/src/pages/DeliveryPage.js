import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import PackageItem from '../components/PackageItem'
import QrCodeScanner from '../components/QrCodeScanner'
import { PRIMARY } from '../constants/buttonTypes'
import { MAIN } from '../constants/pages'
import STATUSES from '../constants/statuses'
import { addPackageToDeliveryAction, updateDeliveryStatusAction } from '../redux/actions/delivery-action'
import { getDeliveryDataByIdSelector, getDeliveryIdSelector } from '../redux/selectors/delivery-selector'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	buttonContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
	},
}))

const DeliveryPage = ({navigation}) => {
	const [isQrScannerOpen, setQrScannerOpen] = useState(false)
	const classes = useStyles()

	const dispatch = useDispatch()
	const deliveryId = useSelector(getDeliveryIdSelector)
	const delivery = useSelector(getDeliveryDataByIdSelector)
	const { packages = {}, status = 'loading' } = delivery || { packages: {}, status: 'loading' }

	// console.log(`deliveryData`, packages)

	const addNew = () => {
		setQrScannerOpen(true)
	}

	const toPage = (page) => navigation.navigation(page)

	const startDelivery = () => {
		dispatch(updateDeliveryStatusAction(deliveryId, STATUSES.IN_PROGRESS))
		toPage(MAIN)
	}

	const validateId = (id) => {
		if (id.match(/package\:/)) {
			const [_, pid] = id.split(': ')
			dispatch(addPackageToDeliveryAction(deliveryId, pid))
			setQrScannerOpen(false)
		}
	}
	if (isQrScannerOpen) return <QrCodeScanner cb={validateId} />

	return (
		<View style={classes.root}>
			<Text>DeliveryId: {deliveryId}</Text>
			<Text>Status: {status}</Text>

			{!!Object.keys(packages).length && (
				<FlatList
					key={(item) => item.id}
					data={Object.values(packages)}
					keyExtractor={(item) => item.id}
					renderItem={(props) => <PackageItem {...props} />}
				/>
			)}
			{status === STATUSES.NEW && (
				<View style={classes.buttonContainer}>
					<Button onPress={addNew} text="Add package to delivery" />
				</View>
			)}
			{status === STATUSES.NEW && !!Object.keys(packages) && (
				<View style={classes.buttonContainer}>
					<Button type={PRIMARY} onPress={startDelivery} text="Start delivery" />
				</View>
			)}
		</View>
	)
}

export default DeliveryPage
