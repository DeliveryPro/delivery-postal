import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const GOOGLE_PLACES_API_KEY = 'AIzaSyBtWdDsEL8Xwz4SxoiauOsln4tox0QITFE'

const useStyles = StyleSheet.create(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
}))

navigator.geolocation = require('@react-native-community/geolocation')

const AddressField = ({ placeholder, onChange }) => {
    const onPress = (data, details) => {
        console.log('onPrss => ', data, details)
    }

    return (
        <GooglePlacesAutocomplete
            placeholder={placeholder || 'Address'}
            minLength={2} // minimum length of text to search
            returnKeyType={'search'}
            fetchDetails={true}
            onPress={(data, details = null) => {
                let coordinates = details.geometry.location
                onChange({ coordinates, details })
            }}
            getDefaultValue={() => ''}
            query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en', // language of the results
                components: 'country:ua',
                // types: '(cities)' // default: 'geocode'
            }}
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GooglePlacesSearchQuery={{
                rankby: 'distance',
                types: 'house',
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_1']}
            debounce={200}
            currentLocation={true}
            currentLocationLabel="Current location"
        />
    )
}

export default AddressField
