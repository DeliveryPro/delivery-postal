import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import QRCode from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'

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

const QrCodeScanner = ({ cb, noTorch }) => {
	const classes = useStyles()
	const onSuccess = ({ data }) => cb(data)

	return (
		<View style={classes.root}>
			<QRCode
				topViewStyle={classes.topContent}
				topContent={<Text styles={classes.text}>Scan QR Code on the box</Text>}
				bottomViewStyle={classes.noView}
				onRead={onSuccess}
				containerStyle={classes.qrContainer}
				flashMode={noTorch ? '' : RNCamera.Constants.FlashMode.torch}
			/>
		</View>
	)
}

export default QrCodeScanner
