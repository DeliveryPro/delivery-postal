import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PRIMARY_COLOR } from '../constants/colors'

const useStyles = StyleSheet.create(() => ({
    root: {
        display: 'flex',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: PRIMARY_COLOR,
        fontSize: 20,
        fontWeight: 'bold',
    },
}))

const NoPackages = () => {
    const classes = useStyles()
    return (
        <View style={classes.root}>
            <Text style={classes.text}>No Packages was found</Text>
        </View>
    )
}

export default NoPackages
