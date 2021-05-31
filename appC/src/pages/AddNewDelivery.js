import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import Input from '../components/Input'
import { UNDERLAY_COLOR } from '../constants/colors'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getDeliveryCreationStateSelector } from '../redux/selectors/delivery-selector'
import { clearNewDeliveryAction, createNewDeliveryAction } from '../redux/actions/delivery-action'
import { getUserIdSelector } from '../redux/selectors/user-selector'
import AddressField from '../components/AddressField'
import { SCREEN_WIDTH } from '../constants/screen'
import { MAIN } from '../constants/pages'

const useStyles = StyleSheet.create((theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: UNDERLAY_COLOR,
    },
    deliveryInfoContainer: {
        display: 'flex',
        paddingTop: 130,
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    addressInputContainer: {
        display: 'flex',
        position: 'absolute',
        width: SCREEN_WIDTH - 20,
        top: 0,
        justifyContent: 'center',
        margin: 10,
        marginVertical: 20,
        zIndex: 10,
    },
    secondAddressInputContainer: {
        top: 70,
        zIndex: 2,
    },

    loading: {
        margin: 10,
    },
}))

const DELIVERY_FIELDS = {
    ADDRESS_FORM: {
        name: 'address_from',
        placeholder: 'From',
    },
    ADDRESS_TO: {
        name: 'address_to',
        placeholder: 'To',
    },
    RECEIVER_EMAIL: {
        name: 'receiver_email',
        placeholder: 'Receiver Email',
    },
    DESCRIPTION: {
        name: 'description',
        placeholder: 'Description',
    },
}

const AddNewDelivery = ({ navigation }) => {
    const [data, setData] = useState({})
    const classes = useStyles()

    const onChange = (field) => (value) => {
        const d = { ...data }
        d[field] = value
        setData(d)
    }

    const uid = useSelector(getUserIdSelector)
    const { isLoading, success } = useSelector(getDeliveryCreationStateSelector)

    const dispatch = useDispatch()

    const to = (page) => navigation.navigate(page)

    useEffect(() => {
        if (success) {
            dispatch(clearNewDeliveryAction())
            to(MAIN)
        }
        return () => dispatch(clearNewDeliveryAction())
    }, [success])

    const onSubmit = async () => dispatch(createNewDeliveryAction({ sender_uid: uid, ...data }))

    return (
        <View style={classes.root}>
            <View style={classes.addressInputContainer}>
                <AddressField
                    placeholder={DELIVERY_FIELDS.ADDRESS_FORM.placeholder}
                    onChange={onChange(DELIVERY_FIELDS.ADDRESS_FORM.name)}
                />
            </View>
            <View style={[classes.addressInputContainer, classes.secondAddressInputContainer]}>
                <AddressField
                    placeholder={DELIVERY_FIELDS.ADDRESS_TO.placeholder}
                    onChange={onChange(DELIVERY_FIELDS.ADDRESS_TO.name)}
                />
            </View>
            <View style={classes.deliveryInfoContainer}>
                <Input
                    placeholder={DELIVERY_FIELDS.RECEIVER_EMAIL.placeholder}
                    value={data[DELIVERY_FIELDS.RECEIVER_EMAIL.name]}
                    onChange={onChange(DELIVERY_FIELDS.RECEIVER_EMAIL.name)}
                />
                <Input
                    placeholder={DELIVERY_FIELDS.DESCRIPTION.placeholder}
                    value={data[DELIVERY_FIELDS.DESCRIPTION.name]}
                    onChange={onChange(DELIVERY_FIELDS.DESCRIPTION.name)}
                />
                {isLoading && (
                    <View style={classes.loading}>
                        <Text>Loading...</Text>
                    </View>
                )}
            </View>

            <View style={classes.buttonContainer}>
                <Button onPress={isLoading ? null : onSubmit}>Submit</Button>
            </View>
        </View>
    )
}

export default AddNewDelivery
