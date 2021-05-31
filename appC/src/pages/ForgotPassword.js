import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableHighlight, KeyboardAvoidingView } from 'react-native'

import Button from '../components/Button'
import Input from '../components/Input'
import LogoBox from '../components/LogoBox'

import { PRIMARY, SECONDARY } from '../constants/buttonTypes'
import { PRIMARY_COLOR, UNDERLAY_COLOR } from '../constants/colors'
import { LOGIN } from '../constants/pages'


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
    linkContainer:{
        marginTop:50
    },
    linkToLogin: {
        color: PRIMARY_COLOR,
        padding:20
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
   
}))

const EMAIL_TYPE = 'email'

const ForgotPassword = ({ navigation }) => {
    const classes = useStyles()
    const [email, setEmail] = useState()

    const onChange = (v) => (e) => {
        if (v === EMAIL_TYPE) setEmail(e)
    }

    const onSubmit = () => {
        console.log('email, pass => ', email, pass)
    }

    const to = (page) => () => navigation.navigate(page)

    return (
        <KeyboardAvoidingView behavior="padding" style={classes.root}>
            <LogoBox />
            <View>
                <View style={classes.textContainer}>
                    <Text style={classes.titleText}>Forgot Password</Text>
                </View>
                <Input value={email} placeholder="Email" label="Email" onChange={onChange(EMAIL_TYPE)} />

                <View style={classes.buttonContainer}>
                    <Button type={email ? PRIMARY : SECONDARY} />
                </View>
            </View>
            <View style={classes.textContainer}>
                <TouchableHighlight style={classes.linkContainer} underlayColor={UNDERLAY_COLOR} onPress={to(LOGIN)}>
                    <Text style={classes.linkToLogin}>Log In</Text>
                </TouchableHighlight>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ForgotPassword
