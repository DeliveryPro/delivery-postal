import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Package from '../assets/package.svg'
import { PRIMARY_COLOR, SECONDARY_COLOR, UNDERLAY_COLOR } from '../constants/colors'
import Minus from '../assets/minus.svg'
import { DELIVERY_PAGE } from '../constants/pages'
import { useDispatch } from 'react-redux'
import { selectDeliveryAction } from '../redux/actions/delivery-action'

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
}))

const DeliveryItem = ({
	item: {
		id,
		status = 'in progress',
		description,
	},
	navigation,
}) => {
	const classes = useStyles()

    const dispatch = useDispatch()
	if (status === 'delivered') {
		classes.root = { ...classes.root, ...classes.inactive }
		classes.text = { ...classes.text, ...classes.inactive }
	}

	const toPage = (page) => () => {
        navigation.navigate(page)
        dispatch(selectDeliveryAction(id))
    }

	// const codeSplitter = (text) => (text?.length > 26 ? `${text.substr(0, 26).trim()} ...` : text)
	return (
		<TouchableOpacity onPress={ toPage(DELIVERY_PAGE)}>
			<View style={classes.root}>
				<View style={classes.item}>
					<View style={{ ...classes.item, ...classes.idContainer }}>
						<Package stroke={PRIMARY_COLOR} width={20} />
						<Text style={{ ...classes.id, ...classes.text }}>{id}</Text>
					</View>

				</View>
				<View style={classes.item}>
					{/* <Text style={{ ...classes.description, ...classes.text }}>{codeSplitter(description)}</Text> */}
					<Text style={classes.text}>{status}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default DeliveryItem
