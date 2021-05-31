import app from './firebase-middleware'

class SupportApi {
	constructor(firebase) {
		this.firebase = firebase
	}

	getSupportMessages = () =>
		this.firebase
			.database()
			.ref(`support`)
			.once('value')
			.then((snapshot) => snapshot.val())

	getOneSupportMessage = (id) =>
		this.firebase
			.database()
			.ref(`support/${id}`)
			.once('value')
			.then((snapshot) => ({ id, ...snapshot.val() }))

	addAnswer = (id, data) => this.firebase.database().ref(`support/${id}`).update(data)
}

export default new SupportApi(app)
