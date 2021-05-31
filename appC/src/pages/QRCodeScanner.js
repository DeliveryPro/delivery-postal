import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import Tabs from '../components/Tabs'
import { QR_CODE_SCANNER } from '../constants/pages'
import QRCode from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'
import { SCREEN_HEIGHT } from '../constants/screen'
import { SECONDARY_COLOR } from '../constants/colors'

const useStyles = StyleSheet.create((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        position: 'relative',
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    buttonTouchable: {
        padding: 16,
    },
    text: {
        fontSize: 20,
        color: '#fff',
    },
    qrContainer: {
        display: 'flex',
        flex: 1,
        height: '100%',
        margin: 0,
        borderRadius: 5,
    },
    topContent: {
        display: 'flex',
        maxHeight: 80,
        zIndex: 100,
        color: '#000',
    },
    noView: {
        display: 'flex',
        maxHeight: 0,
    },
}))

const QRCodeScanner = (props) => {
    const classes = useStyles()

    const onSuccess = (e) => {
        console.log('e data => ', e.data)
    }

    return (
        <View style={classes.root}>
            <QRCode
                topViewStyle={classes.topContent}
                topContent={<Text styles={classes.text}>Scan QR Code on the box</Text>}
                bottomViewStyle={classes.noView}
                onRead={onSuccess}
                containerStyle={classes.qrContainer}
                flashMode={RNCamera.Constants.FlashMode.torch}
            />
            <Tabs activeScreen={QR_CODE_SCANNER} {...props} />
        </View>
    )
}

export default QRCodeScanner
