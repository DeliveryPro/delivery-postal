import database from '@react-native-firebase/database'

class DeliveryApi {
	createNewDelivery = async (userId) => {
		const { key } = await database().ref('aggregatedDelivery').push({ status: 'new', courierId: userId })
		return key
	}
	getAllUserDelivery = (userId) =>
		database()
			.ref(`users/${userId}`)
			.child('courierDeliveries')
			.once('value')
			.then((data) => data.val())

	selectDelivery = (deliveryId) =>
		database()
			.ref('aggregatedDelivery')
			.child(deliveryId)
			.once('value')
			.then((data) => data.val())

	addPackageToDelivery = (deliveryId, packageId) =>
		database().ref(`aggregatedDelivery/${deliveryId}/packages`).child(packageId).set({ id: packageId })

	getPackageData = (packageId) =>
		database()
			.ref('delivery')
			.child(packageId)
			.once('value')
			.then((data) => ({ [packageId]: data.val() }))

	updatePackageDataInDelivery = ({ deliveryId, data }) =>
		database().ref(`aggregatedDelivery/${deliveryId}/packages`).update(data)

	updateDeliveryStatus = ({ deliveryId, status }) =>
		database().ref(`aggregatedDelivery/${deliveryId}`).update({ status })
}

export default new DeliveryApi()
