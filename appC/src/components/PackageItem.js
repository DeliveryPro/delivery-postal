import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableHighlight, ToastAndroid } from 'react-native'

import Package from '../assets/package.svg'
import { PRIMARY_COLOR, UNDERLAY_COLOR } from '../constants/colors'
import Minus from '../assets/minus.svg'
import STATUSES from '../constants/statuses'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/screen'
import QrCodeScanner from './QrCodeScanner'
import { useDispatch } from 'react-redux'
import { setMapItemAction, updateDeliveryPackageAction } from '../redux/actions/delivery-action'
import { MAP } from '../constants/pages'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		height: 100,
		margin: 5,
		marginBottom: 0,
		padding: 10,
		borderWidth: 0,
		borderBottomWidth: 1.5,
		borderRadius: 5,
		borderColor: PRIMARY_COLOR,
		backgroundColor: '#ccc',
	},
	pathContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: 0,
		paddingRight: 20,
	},
	text: {
		color: PRIMARY_COLOR,
	},
	id: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	idContainer: {
		paddingLeft: 0,
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingBottom: 5,
	},
	inactive: {
		color: UNDERLAY_COLOR,
		backgroundColor: '#eee',
	},
	description: {
		color: PRIMARY_COLOR,
	},
	modal: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#eee',
		marginTop: SCREEN_HEIGHT / 3,
		marginLeft: SCREEN_WIDTH / 7,
		marginRight: SCREEN_WIDTH / 7,
		borderRadius: 5,
		borderWidth: 1,
		borderStyle: 'solid',
	},
	modalRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	modalItem: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#eee',
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding: 10,
		margin: 5,
		borderRadius: 5,
		borderColor: PRIMARY_COLOR,
	},
	modalItemText: {
		fontSize: 18,
		color: PRIMARY_COLOR,
	},
	titleText: {
		alignSelf: 'center',
		margin: 5,
		fontSize: 20,
	},
}))

const APPROVE_DELIVERY = 'APPROVE_DELIVERY'
const DECLINE_DELIVERY = 'DECLINE_DELIVERY'
const VIEW_ON_MAP = 'VIEW_ON_MAP'
const BACK = 'BACK'

const PackageItem = ({
	deliveryId,
	packageId,
	data: { id, address_to, status, receiver_uid },
	data,
	navigation,
}) => {
	const [packageActionsVisible, setPackageActionsVisible] = useState(false)
	const [isQrCodeScannerOpen, setQrCodeScannerOpen] = useState(false)
	const dispatch = useDispatch()

	const {
		details: { vicinity: to },
	} = address_to || { details: { vicinity: '' } }

	const classes = useStyles()

	if (status === STATUSES.COMPLETED) {
		classes.root = { ...classes.root, ...classes.inactive }
		classes.text = { ...classes.text, ...classes.inactive }
	}

	const modalToggle = () => setPackageActionsVisible(!packageActionsVisible)

	const validateId = (uid) => {
		setQrCodeScannerOpen(false)
		setPackageActionsVisible(false)
		if (uid !== receiver_uid) {
			ToastAndroid.show('User id mismatch', ToastAndroid.SHORT)
			return
		}
		dispatch(updateDeliveryPackageAction({ packageId, status: STATUSES.COMPLETED, deliveryId }))
	}

	const selectAction = (type) => () => {
		switch (type) {
			case APPROVE_DELIVERY:
				setQrCodeScannerOpen(true)
			case DECLINE_DELIVERY:
				console.log('declined')
		}
	}

	const toPage = (page) => navigation.navigate(page)

	const toMap = () => {
		dispatch(setMapItemAction(data))
		modalToggle()
		toPage(MAP)
	}

	if (isQrCodeScannerOpen) return <QrCodeScanner cb={validateId} noTorch />

	return (
		<View style={classes.root}>
			<ModalContent
				visible={packageActionsVisible}
				closeModal={modalToggle}
				selectAction={selectAction}
				toMap={toMap}
			/>
			<TouchableHighlight onPress={modalToggle}>
				<>
					<View style={classes.item}>
						<View style={{ ...classes.item, ...classes.idContainer }}>
							<Text style={{ ...classes.id, ...classes.text }}>ID: {packageId}</Text>
						</View>
					</View>
					<View style={classes.item}>
						<View style={classes.pathContainer}>
							<Text style={classes.text}>Receiver: </Text>
							<Text style={classes.text}>{to}</Text>
						</View>
					</View>
					<View style={classes.item}>
						<View style={classes.pathContainer}>
							<Text style={classes.text}>Status: </Text>
							<Text style={classes.text}>{status}</Text>
						</View>
					</View>
				</>
			</TouchableHighlight>
		</View>
	)
}

const ModalContent = ({ visible, closeModal, selectAction, toMap }) => {
	const [showConfirm, setConfirm] = useState(false)
	const [confirmAction, setConfirmAction] = useState('')
	const classes = useStyles()

	const toggleConfirmation = () => setConfirm(!showConfirm)

	const selectItem = (type) => () => {
		setConfirmAction(type)
		if (type === VIEW_ON_MAP) return toMap()
		if (type === BACK) return closeModal()

		toggleConfirmation()
	}

	const declineAction = () => {
		setConfirmAction('')
		toggleConfirmation()
	}

	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
			{showConfirm ? (
				<View style={classes.modal}>
					{confirmAction === APPROVE_DELIVERY && <Text style={classes.titleText}>Approve delivery? </Text>}
					{confirmAction === DECLINE_DELIVERY && <Text style={classes.titleText}>Decline delivery? </Text>}
					<View style={classes.modalRow}>
						<TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={selectAction(confirmAction)}>
							<View style={classes.modalItem}>
								<Text style={classes.modalItemText}>Yes</Text>
							</View>
						</TouchableHighlight>
						<TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={declineAction}>
							<View style={classes.modalItem}>
								<Text style={classes.modalItemText}>No</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>
			) : (
				<View style={classes.modal}>
					<TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={selectItem(APPROVE_DELIVERY)}>
						<View style={classes.modalItem}>
							<Text style={classes.modalItemText}>Approve</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={selectItem(DECLINE_DELIVERY)}>
						<View style={classes.modalItem}>
							<Text style={classes.modalItemText}>Decline</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={selectItem(VIEW_ON_MAP)}>
						<View style={classes.modalItem}>
							<Text style={classes.modalItemText}>View on Map</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={selectItem(BACK)}>
						<View style={classes.modalItem}>
							<Text style={classes.modalItemText}>Back</Text>
						</View>
					</TouchableHighlight>
				</View>
			)}
		</Modal>
	)
}

export default PackageItem
