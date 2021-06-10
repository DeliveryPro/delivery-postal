import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Modal, TouchableHighlight, Image } from 'react-native'
import DatePicker from 'react-native-date-picker'

import ImagePicker from 'react-native-image-crop-picker'
import { PRIMARY_COLOR, SECONDARY_COLOR, UNDERLAY_COLOR } from '../constants/colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/screen'

import Camera from '../assets/camera.svg'
import Folder from '../assets/folder.svg'
import User from '../assets/profile.svg'
import Input from '../components/Input'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDataSelector, getUserIdSelector } from '../redux/selectors/user-selector'
import { getUserDataAction, updateUserAction, updateUserPhotoAction } from '../redux/actions/user-action'
import { logOutUserAction } from '../redux/actions/auth-action'

const useStyles = StyleSheet.create((theme) => ({
	root: {
		display: 'flex',
		padding: 10,
	},
	logo: {
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
		borderRadius: 5,
		backgroundColor: SECONDARY_COLOR,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#eee',
		marginTop: SCREEN_HEIGHT / 3,
		marginLeft: SCREEN_WIDTH / 7,
		marginRight: SCREEN_WIDTH / 7,
		borderRadius: 5,
		borderWidth: 1,
		borderStyle: 'solid',
	},
	modalItem: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#eee',
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding: 10,
		margin: 5,
		borderRadius: 5,
		borderColor: PRIMARY_COLOR,
	},
	modalItemText: {
		fontSize: 18,
		color: PRIMARY_COLOR,
	},
	avatarContainer: {
		display: 'flex',
		flexDirection: 'column',
		height: SCREEN_HEIGHT / 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		display: 'flex',
	},
	buttonContainer: {
		display: 'flex',
		padding: 10,
		alignItems: 'center',
	},
	dateContainer: {
		display: 'flex',
		borderWidth: 1,
		margin: 10,
		marginBottom: 0,
		borderRadius: 4,
		borderColor: SECONDARY_COLOR,
	},
	text: {
		padding: 10,
	},
}))

const CAMERA = 'camera'
const FILES = 'files'

const IMAGE_SIZE = 80

const CAMERA_VARIABLES = {
	width: 300,
	height: 400,
	cropping: true,
	includeBase64: true,
}

const PROFILE_FIELDS = {
	NAME: {
		name: 'name',
	},
	EMAIL: {
		name: 'email',
	},
	BIRTH_DATE: {
		name: 'birth_date',
	},
	IMAGE: {
		name: 'photo',
	},
}

const Profile = ({ route }) => {
	const [modalAvatarSourcePicker, setModalAvatarSourcePicker] = useState(false)
	const [avatarSource, setAvatarSource] = useState(null)
	const [data, setData] = useState({})
	const [changed, setChanged] = useState(false)
	const [visibleModalDatePicker, setVisibleModalDatePicker] = useState(new Date())

	const classes = useStyles()
	const modalCallAvatar = () => setModalAvatarSourcePicker(!modalAvatarSourcePicker)
	const modalCallDate = () => setVisibleModalDatePicker(!visibleModalDatePicker)

	const setImageGetterSource = (source) => () => setAvatarSource(source)

	const dispatch = useDispatch()
	const uid = useSelector(getUserIdSelector)
	const userData = useSelector(getUserDataSelector)

	useEffect(() => {
		if (uid) dispatch(getUserDataAction(uid))
	}, [uid])

	useEffect(() => {
		if (userData) setData(userData)
	}, [userData])

	const folderImagePicker = async () => {
		const img = await ImagePicker.openPicker(CAMERA_VARIABLES)
		setValue(PROFILE_FIELDS.IMAGE.name)(img)
		dispatch(updateUserPhotoAction(uid, img))
		modalCallAvatar()
	}
	const cameraImagePicker = async () => {
		const img = await ImagePicker.openCamera(CAMERA_VARIABLES)
		setValue(PROFILE_FIELDS.IMAGE.name)(img)
		dispatch(updateUserPhotoAction(uid, img))
		modalCallAvatar()
	}

	useEffect(() => {
		if (!Boolean(avatarSource)) return
		if (avatarSource === CAMERA) cameraImagePicker()
		if (avatarSource === FILES) folderImagePicker()
	}, [avatarSource])

	const setValue = (type) => (value) => {
		const d = { ...data }
		d[type] = value
		setData(d)
		setChanged(true)
	}

	const onSave = () => {
		delete data[PROFILE_FIELDS.IMAGE.name]
		data[PROFILE_FIELDS.BIRTH_DATE.name] = new Date(data[PROFILE_FIELDS.BIRTH_DATE.name]).toDateString()
		dispatch(updateUserAction(uid, data))
		setChanged(false)
	}

	const logOut = () => dispatch(logOutUserAction())

	return (
		<View style={classes.root}>
			<ModalContent
				visible={modalAvatarSourcePicker}
				closeModal={modalCallAvatar}
				selectItem={setImageGetterSource}
			/>
			<TouchableHighlight onPress={modalCallAvatar}>
				<View style={classes.avatarContainer}>
					{data[PROFILE_FIELDS.IMAGE.name] ? (
						<Image
							style={classes.logo}
							source={{
								uri: data[PROFILE_FIELDS.IMAGE.name]?.data
									? `data:${data[PROFILE_FIELDS.IMAGE.name].mime};base64,${
											data[PROFILE_FIELDS.IMAGE.name].data
									  }`
									: data[PROFILE_FIELDS.IMAGE.name],
							}}
						/>
					) : (
						<View style={classes.logo}>
							<User width={IMAGE_SIZE / 1.2} height={IMAGE_SIZE / 1.2} />
						</View>
					)}
				</View>
			</TouchableHighlight>
			<View style={classes.inputContainer}>
				<Input
					placeholder="Name/Surname"
					contentType=""
					onChange={setValue(PROFILE_FIELDS.NAME.name)}
					value={data[PROFILE_FIELDS.NAME.name]}
				/>
			</View>
			<View style={classes.inputContainer}>
				<Input
					placeholder="Email"
					contentType=""
					onChange={setValue(PROFILE_FIELDS.EMAIL.name)}
					value={data[PROFILE_FIELDS.EMAIL.name]}
				/>
			</View>
			<View style={classes.inputContainer}>
				<TouchableHighlight onPress={modalCallDate}>
					<View style={classes.dateContainer}>
						{data[PROFILE_FIELDS.BIRTH_DATE.name] ? (
							<Text style={classes.text}>
								{data[PROFILE_FIELDS.BIRTH_DATE.name]?.toString().substr(0, 15)}
							</Text>
						) : (
							<Text style={classes.text}>Birthday</Text>
						)}
					</View>
				</TouchableHighlight>
				<ModalDatePicker
					birth={data[PROFILE_FIELDS.BIRTH_DATE.name]}
					visible={visibleModalDatePicker}
					closeModal={modalCallDate}
					setTime={setValue(PROFILE_FIELDS.BIRTH_DATE.name)}
				/>
			</View>
			{changed && (
				<View style={classes.buttonContainer}>
					<Button onPress={onSave} text="Submit" />
				</View>
			)}

			<View style={classes.buttonContainer}>
				<Button onPress={logOut} text="Log out" />
			</View>
		</View>
	)
}

const ModalDatePicker = ({ visible, birth, closeModal, setTime }) => {
	const classes = useStyles()
	const dateNow = new Date()
	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
			<View style={classes.modal}>
				<DatePicker mode="date" style={{ maxWidth: '100%' }} date={birth || dateNow} onDateChange={setTime} />
				<View style={classes.buttonContainer}>
					<Button onPress={closeModal} />
				</View>
			</View>
		</Modal>
	)
}

const ModalContent = ({ visible, closeModal, selectItem }) => {
	const classes = useStyles()
	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
			<View style={classes.modal}>
				<TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={selectItem(FILES)}>
					<View style={classes.modalItem}>
						<Folder width={30} />
						<Text style={classes.modalItemText}>Folder</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={selectItem(CAMERA)}>
					<View style={classes.modalItem}>
						<Camera width={30} />
						<Text style={classes.modalItemText}>Camera</Text>
					</View>
				</TouchableHighlight>
			</View>
		</Modal>
	)
}

export default Profile
