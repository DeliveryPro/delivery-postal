import app from 'firebase/app'
// import 'firebase/storage'
// import 'firebase/auth'
// import 'firebase/database'
// import 'firebase/messaging'

// const {
// 	REACT_APP_API_KEY,
// 	REACT_APP_AUTH_DOMAIN,
// 	REACT_APP_DATABASE_URL,
// 	REACT_APP_PROJECT_ID,
// 	REACT_APP_STORAGE_BUCKET,
// 	REACT_APP_MESSAGING_SENDER_ID,
// } = process.env

const config = {
	// apiKey: REACT_APP_API_KEY,
	// authDomain: REACT_APP_AUTH_DOMAIN,
	// databaseURL: REACT_APP_DATABASE_URL,
	// projectId: REACT_APP_PROJECT_ID,
	// storageBucket: REACT_APP_STORAGE_BUCKET,
	// messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
	apiKey: 'AIzaSyBzdA3kCN6hN_jkM6h9D5Jvb3EKba-NDX8',
	authDomain: 'delivery-27fce.firebaseapp.com',
	databaseURL: 'https://delivery-27fce-default-rtdb.firebaseio.com',
	projectId: 'delivery-27fce',
	storageBucket: 'delivery-27fce.appspot.com',
	messagingSenderId: '902043234223',
	// appId: '1:902043234223:web:8ab7243939e87044fb495a',
	// measurementId: 'G-K3LD94K50E',
}

app.initializeApp(config)


export default app
