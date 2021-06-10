import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import PackageItem from '../components/PackageItem'
import QrCodeScanner from '../components/QrCodeScanner'
import { PRIMARY } from '../constants/buttonTypes'
import STATUSES from '../constants/statuses'
import {
	addPackageToDeliveryAction,
	selectDeliveryAction,
	updateDeliveryStatusAction,
} from '../redux/actions/delivery-action'
import { getDeliveryDataByIdSelector, getDeliveryIdSelector } from '../redux/selectors/delivery-selector'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		padding: 10,
	},
	buttonContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
	},
	titleText: {
		fontSize: 20,
		margin: 3,
	},
}))

const DeliveryPage = ({ navigation }) => {
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

	const startDelivery = () => {
		dispatch(updateDeliveryStatusAction(deliveryId, STATUSES.IN_PROGRESS))
		dispatch(selectDeliveryAction(deliveryId))
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
			<Text style={classes.titleText}>DeliveryId: {deliveryId}</Text>
			<Text style={classes.titleText}>Status: {status}</Text>

			{!!Object.keys(packages).length && (
				<FlatList
					data={Object.keys(packages)}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<PackageItem
							{...item}
							packageId={item}
							deliveryId={deliveryId}
							data={packages[item]}
							navigation={navigation}
						/>
					)}
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
