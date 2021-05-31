import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/colors'

const useStyles = StyleSheet.create((theme) => ({
    inputLabel: {
        color: PRIMARY_COLOR,
    },
    input: {
        display: 'flex',
        borderWidth: 1,
        borderRadius: 4,
        height: 40,
        padding: 10,
        borderColor: SECONDARY_COLOR,
    },
    inputContainer: {
        display: 'flex',
        position: 'relative',
        margin: 10,
    },
    active: {
        borderColor: PRIMARY_COLOR,
    },
}))

const Input = ({ value = '', label = '', placeholder = '', contentType = 'nickname', onChange, ...props }) => {
    const classes = useStyles()
    const [focused, setFocused] = useState(false)

    let inputStyle = { ...classes.input }

    if (focused) inputStyle = { ...inputStyle, ...classes.active }

    const changeFocus = () => setFocused(!focused)

    return (
        <View style={classes.inputContainer}>
            <Text style={classes.inputLabel}>{label}</Text>
            <TextInput
                onFocus={changeFocus}
                onEndEditing={changeFocus}
                style={inputStyle}
                textContentType={contentType}
                placeholder={placeholder}
                onChangeText={onChange}
                value={value}
                {...props}
            />
        </View>
    )
}

export default Input
