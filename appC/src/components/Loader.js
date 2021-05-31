import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Animated, Easing } from 'react-native'
import LoadIcon from '../assets/loader.svg'

const useStyles = StyleSheet.create(() => ({
    root: {
        display: 'flex',
        justifyContext: 'center',
        alignItems: 'center',
    },
}))

const LoaderContainer = () => {
    const classes = useStyles()

    let spinValue = new Animated.Value(0)

    // First set up animation
    Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
    }).start()

    // Next, interpolate beginning and end values (in case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
        }),
    ).start()

    return (
        <View style={classes.root}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <LoadIcon width={100} />
            </Animated.View>
        </View>
    )
}

export default LoaderContainer
