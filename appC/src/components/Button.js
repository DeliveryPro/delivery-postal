import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { PRIMARY, SECONDARY } from '../constants/buttonTypes'
import { PRIMARY_COLOR, SECONDARY_COLOR, UNDERLAY_COLOR } from '../constants/colors'

const useStyles = StyleSheet.create((theme) => ({
    button: {
        padding: 35,
    },
    buttonContainer: {
        display: 'flex',
        height: 40,
        minWidth:250,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'red',
        borderRadius: 4,
    },
    primary: {
        backgroundColor: PRIMARY_COLOR,
    },
    secondary: {
        backgroundColor: SECONDARY_COLOR,
    },
    textPrimary: {
        color: '#fff',
    },
    textSecondary: {
        color: '#000',
    },
}))

const Button = ({ type = SECONDARY, text = 'SUBMIT', onPress = () => {} }) => {
    const classes = useStyles()

    let ContainerStyles = { ...classes.buttonContainer, ...classes.primary }
    let TextStyle = { ...classes.button, ...classes.textPrimary }

    if (type !== PRIMARY) {
        ContainerStyles = { ...ContainerStyles, ...classes.secondary }
        TextStyle = { ...TextStyle, ...classes.textSecondary }
    }

    return (
        <TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={onPress}>
            <View style={ContainerStyles}>
                <Text style={TextStyle}>{text}</Text>
            </View>
        </TouchableHighlight>
    )
}

export default Button
