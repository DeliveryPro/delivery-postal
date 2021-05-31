import React from 'react'
import { StyleSheet, View } from 'react-native'
import Logo from '../assets/logo.svg'
import { SCREEN_WIDTH } from '../constants/screen'

const LOGO_SIZE = 90

const useStyles = StyleSheet.create(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 40,
        marginTop: SCREEN_WIDTH / 4,
    },
}))

const LogoBox = () => {
    const classes = useStyles()
    return (
        <View style={classes.root}>
            <Logo width={LOGO_SIZE} height={LOGO_SIZE} />
        </View>
    )
}

export default LogoBox
