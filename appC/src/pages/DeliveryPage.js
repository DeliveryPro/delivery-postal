import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import PackageItem from '../components/PackageItem'
import QrCodeScanner from '../components/QrCodeScanner'
import { PRIMARY } from '../constants/buttonTypes'
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

const DeliveryPage = () => {
	const [isQrScannerOpen, setQrScannerOpen] = useState(false)
	const classes = useStyles()

	const dispatch = useDispatch()
	const deliveryId = useSelector(getDeliveryIdSelector)
	const delivery = useSelector(getDeliveryDataByIdSelector)
	const { packages, status } = delivery
	// console.log(`deliveryData`, packages, delivery)

	const addNew = () => {
		setQrScannerOpen(true)
	}

	const startDelivery = () => {
		dispatch(updateDeliveryStatusAction(deliveryId, STATUSES.IN_PROGRESS))
	}

	const validateId = (id) => {
		if (id.match(/package\:/)) {
			const [_, pid] = id.split(': ')
			dispatch(addPackageToDeliveryAction(deliveryId, pid))
			setQrScannerOpen(false)
		}
	}
	if (isQrScannerOpen) return <QrCodeScanner cb={validateId} />
	// console.log(`packages`, packages)
	return (
		<View style={classes.root}>
			<Text>DeliveryId: {deliveryId}</Text>
			<Text>Status: {status}</Text>

			{packages && (
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
			{status === STATUSES.NEW && Object.keys(packages).length && (
				<View style={classes.buttonContainer}>
					<Button type={PRIMARY} onPress={startDelivery} text="Start delivery" />
				</View>
			)}
		</View>
	)
}

export default DeliveryPage
