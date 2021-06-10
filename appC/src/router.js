import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { checkUserAuthAction } from './redux/actions/auth-action'

import MainScreen from './pages/Main'
import ProfileScreen from './pages/Profile'
import LoginScreen from './pages/Login'
import RegistrationScreen from './pages/Registration'
import ForgotPasswordScreen from './pages/ForgotPassword'
import ConfirmPasswordScreen from './pages/ConfirmPassword'
import MapScreen from './pages/Map'
import QRCodeScannerScreen from './pages/QRCodeScanner'
import NewPackageScreen from './pages/AddNewDelivery'
import DeliveryPageScreen from './pages/DeliveryPage'

import {
	MAIN,
	MAP,
	PROFILE,
	QR_CODE_SCANNER,
	LOGIN,
	REGISTRATION,
	FORGOT_PASSWORD,
	DELIVERY_INFO,
	CONFIRM_PASSWORD,
	NEW_PACKAGE,
	DELIVERY_PAGE,
} from './constants/pages'

import Header from './components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { isUserAuthSelector } from './redux/selectors/auth-selector'

const Stack = createStackNavigator()

const HeaderShown = (props) => ({
	headerLeft: null,
	headerTitle: (route) => <Header {...props} route={route} />,
})

const NoHeader = () => ({
	headerShown: false,
})


const AuthRoutes = () => (
	<Stack.Navigator>
		<Stack.Screen name={MAIN} component={MainScreen} options={HeaderShown} />
		<Stack.Screen name={MAP} component={MapScreen} />
		<Stack.Screen name={NEW_PACKAGE} component={NewPackageScreen} />
		<Stack.Screen name={PROFILE} component={ProfileScreen} />
		<Stack.Screen name={DELIVERY_INFO} component={ProfileScreen} />
		<Stack.Screen name={DELIVERY_PAGE} component={DeliveryPageScreen} />
		<Stack.Screen name={QR_CODE_SCANNER} component={QRCodeScannerScreen} options={HeaderShown} />
	</Stack.Navigator>
)

const UnAuthRoutes = () => (
	<Stack.Navigator>
		<Stack.Screen name={LOGIN} component={LoginScreen} options={NoHeader} />
		<Stack.Screen name={REGISTRATION} component={RegistrationScreen} options={NoHeader} />
		<Stack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen} options={NoHeader} />
		<Stack.Screen name={CONFIRM_PASSWORD} component={ConfirmPasswordScreen} options={NoHeader} />
	</Stack.Navigator>
)

const Router = () => {
	const isAuth = useSelector(isUserAuthSelector)

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(checkUserAuthAction())
	}, [])

	return isAuth ? <AuthRoutes /> : <UnAuthRoutes />
}

export default Router
