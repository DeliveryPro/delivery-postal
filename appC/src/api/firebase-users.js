import database from '@react-native-firebase/database'
class UsersApi {
	getUser = (userId) =>
		database()
			.ref(`users/${userId}`)
			.once('value')
			.then((snapshot) => snapshot.val())

	updateUser = (userId, data) => database().ref(`users`).child(userId).update(data)

	updateUserPosition = (userId, data) => database().ref(`couriers/${userId}`).update(data)

	addNewUserDelivery = (userId, deliveryId) =>
		database().ref(`users/${userId}/courierDeliveries`).child(deliveryId).set({ status: 'created', id: deliveryId })
}

export default new UsersApi()
