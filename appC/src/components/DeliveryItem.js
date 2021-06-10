import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Package from '../assets/package.svg'
import { PRIMARY_COLOR, SECONDARY_COLOR, UNDERLAY_COLOR } from '../constants/colors'
import Minus from '../assets/minus.svg'
import { DELIVERY_PAGE } from '../constants/pages'
import { useDispatch } from 'react-redux'
import { selectDeliveryAction } from '../redux/actions/delivery-action'
import STATUSES from '../constants/statuses'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		height: 90,
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
		marginLeft: 10,
	},
	idContainer: {
		paddingLeft: 0,
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingLeft: 10,
		paddingBottom: 5,
	},
	inactive: {
		color: UNDERLAY_COLOR,
		backgroundColor: '#eee',
	},
	status: {
		marginLeft: 10,
	},
}))

const DeliveryItem = ({ item: { id, status, description }, navigation }) => {
	const classes = useStyles()

	const dispatch = useDispatch()
	if (status === STATUSES.COMPLETED) {
		classes.root = { ...classes.root, ...classes.inactive }
		classes.text = { ...classes.text, ...classes.inactive }
	}

	const toPage = (page) => () => {
		dispatch(selectDeliveryAction(id))
		navigation.navigate(page)
	}

	return (
		<TouchableOpacity onPress={toPage(DELIVERY_PAGE)}>
			<View style={classes.root}>
				<View style={classes.item}>
					<View style={{ ...classes.item, ...classes.idContainer }}>
						<Package stroke={PRIMARY_COLOR} width={20} />
						<Text style={{ ...classes.id, ...classes.text }}>{id}</Text>
					</View>
				</View>
				<View style={classes.item}>
					<Text style={classes.text}>Status:</Text>
					<Text style={{ ...classes.text, ...classes.status }}>{status}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default DeliveryItem
