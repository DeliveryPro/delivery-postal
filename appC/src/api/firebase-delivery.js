import database from '@react-native-firebase/database'

class DeliveryApi {
    createNew = (data) => database().ref(`delivery`).push(data)

    getList = (userId) =>
        database()
            .ref(`users/${userId}/delivery`)
            .once('value')
            .then((data) => data.val())

    subscribeOnChange = (userId, cb) =>
        database()
            .ref(`users/${userId}/delivery`)
            .on('child_changed', (data) => cb({ [data.key]: data.val() }))

    subscribeOnAdd = (userId, cb) =>
        database()
            .ref(`users/${userId}/delivery`)
            .on('child_added', (data) => cb({ [data.key]: data.val() }))
}

export default new DeliveryApi()
