import database from '@react-native-firebase/database'
class UsersApi {
    getUser = (userId) =>
        database()
            .ref(`users/${userId}`)
            .once('value')
            .then((snapshot) => snapshot.val())

    updateUser = (userId, data) => database().ref(`users`).child(userId).update(data)
}

export default new UsersApi()
