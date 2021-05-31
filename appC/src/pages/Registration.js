import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import { useDispatch } from 'react-redux'

import Button from '../components/Button'
import Input from '../components/Input'
import LogoBox from '../components/LogoBox'

import { PRIMARY, SECONDARY } from '../constants/buttonTypes'
import { PRIMARY_COLOR, UNDERLAY_COLOR } from '../constants/colors'
import { LOGIN } from '../constants/pages'
import { SCREEN_WIDTH } from '../constants/screen'
import { registerUserWithEmailAction } from '../redux/actions/auth-action'

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
    lintToLogin: {
        margin: 30,
        color: PRIMARY_COLOR,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    textMargin: {
        paddingTop: 35,
    },
}))

const EMAIL_TYPE = 'email'
const PASSWORD_TYPE = 'password'

const Registration = ({ navigation }) => {
    const classes = useStyles()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const onChange = (v) => (e) => {
        if (v === EMAIL_TYPE) setEmail(e)
        if (v === PASSWORD_TYPE) setPassword(e)
    }

    const dispatch = useDispatch()

    const onSubmit = () => {
        console.log('email, pass => ', email, password)
        dispatch(registerUserWithEmailAction({email, password}))
    }

    const to = (page) => () => navigation.navigate(page)

    return (
        <KeyboardAvoidingView behavior="padding" style={classes.root}>
            <LogoBox />
            <View>
                <View style={classes.textContainer}>
                    <Text style={classes.titleText}>Registration</Text>
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
                    <Button type={email && password ? PRIMARY : SECONDARY} text="Sign Up" onPress={onSubmit} />
                </View>
            </View>
            <View style={{ ...classes.textContainer, ...classes.textMargin }}>
                <TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={to(LOGIN)}>
                    <Text style={classes.lintToLogin}>Log In</Text>
                </TouchableHighlight>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Registration
