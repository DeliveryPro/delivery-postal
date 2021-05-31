import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import { GoogleSignin } from '@react-native-community/google-signin'
import { useDispatch, useSelector } from 'react-redux'

import AuthContext from '../AuthContext'
// import ErrorContext from '../ErrorContext'

import Button from '../components/Button'
import Input from '../components/Input'
import LogoBox from '../components/LogoBox'

import { PRIMARY, SECONDARY } from '../constants/buttonTypes'
import { PRIMARY_COLOR, UNDERLAY_COLOR } from '../constants/colors'
import { FORGOT_PASSWORD, REGISTRATION } from '../constants/pages'
import { SCREEN_WIDTH } from '../constants/screen'

import Google from '../assets/google.svg'
import { googleAuthAction, loginWithEmailAction } from '../redux/actions/auth-action'

import { isUserAuthSelector } from '../redux/selectors/auth-selector'

GoogleSignin.configure()

const useStyles = StyleSheet.create((theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    textContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 10,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    googleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 20,
        borderColor: PRIMARY_COLOR,
        borderWidth: 1,
        borderType: 'solid',
        borderRadius: 4,
        height: 40,
        width: SCREEN_WIDTH / 1.4,
    },
    googleText: {
        paddingLeft: 10,
    },
    linkToForgotPassword: {
        color: PRIMARY_COLOR,
    },
    forgotPasswordContainer: {
        marginRight: SCREEN_WIDTH / 3.5,
    },
}))

const EMAIL_TYPE = 'email'
const PASSWORD_TYPE = 'password'

const Login = ({ navigation }) => {
    const classes = useStyles()

    // const { message, onError, hideError } = React.useContext(ErrorContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const onChange = (v) => (e) => {
        if (v === EMAIL_TYPE) setEmail(e)
        if (v === PASSWORD_TYPE) setPassword(e)
    }

    const onSubmit = () => {
        dispatch(loginWithEmailAction({ email, password }))
        // dispatch(loginUserFunction({ email, pass }))
        console.log('email, pass => ', email, password)
    }

    const to = (page) => () => navigation.navigate(page)


    return (
        <KeyboardAvoidingView behavior="padding" style={classes.root}>
            <LogoBox />
            <View>
                <View style={classes.textContainer}>
                    <Text style={classes.titleText}>Courier App Login</Text>
                </View>
                <Input value={email} placeholder="Email" label="Email" onChange={onChange(EMAIL_TYPE)} />
                <Input
                    value={password}
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                    label="Password"
                    onChange={onChange(PASSWORD_TYPE)}
                />

                <View style={classes.buttonContainer}>
                    <TouchableHighlight
                        style={classes.forgotPasswordContainer}
                        underlayColor={UNDERLAY_COLOR}
                        onPress={to(FORGOT_PASSWORD)}
                    >
                        <Text style={classes.linkToForgotPassword}>Forgot Password?</Text>
                    </TouchableHighlight>
                    <Button type={email && password ? PRIMARY : SECONDARY} onPress={onSubmit} />
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}

export default Login
