import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Tabs from '../components/Tabs'
import { MAP } from '../constants/pages'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Pin from '../assets/pin.svg'

import MapViewDirections from 'react-native-maps-directions'
import { PRIMARY_COLOR } from '../constants/colors'
import { useSelector } from 'react-redux'
import { getMapDataSelector } from '../redux/selectors/delivery-selector'
import Geolocation from '@react-native-community/geolocation'
import { userPositionSelector } from '../redux/selectors/user-selector'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		position: 'relative',
	},
	mapContainer: {
		display: 'flex',
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
}))

const GOOGLE_MAPS_APIKEY = 'AIzaSyAwajrFxnsBUZgnLKOzo_Z6HEAalSavUIo'

const Map = (props) => {
	const classes = useStyles()

	const { address_to } = useSelector(getMapDataSelector)
	const { coords } = useSelector(userPositionSelector)

	console.log('coords data=> ', coords, address_to)

	return (
		<View style={classes.root}>
			<View style={classes.mapContainer}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={classes.map}
					initialRegion={{
						latitude: 50.019823,
						longitude: 36.215636,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>
					{coords && <Marker title="Your Location" coordinate={coords} />}

					{address_to && (
						<>
							<Marker
								title="To"
								coordinate={{
									latitude: address_to.coordinates.lat,
									longitude: address_to.coordinates.lng,
								}}
							/>

							<MapViewDirections
								origin={coords}
								strokeWidth={3}
								strokeColor={PRIMARY_COLOR}
								destination={{
									latitude: address_to.coordinates.lat,
									longitude: address_to.coordinates.lng,
								}}
								apikey={GOOGLE_MAPS_APIKEY}
							/>
						</>
					)}
				</MapView>
			</View>
		</View>
	)
}

export default Map
