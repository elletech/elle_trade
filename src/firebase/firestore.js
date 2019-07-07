import Firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyDZ9WEZ81wFnQnRf7Sqssz1qMXzFL0T8QM",
    authDomain: "elletrade.firebaseapp.com",
    databaseURL: "https://elletrade.firebaseio.com",
    projectId: "elletrade",
    storageBucket: "",
    messagingSenderId: "760639918983",
    appId: "1:760639918983:web:30c04ca4bf42e6bc"
}

const firebaseApp = Firebase.initializeApp(config, 'exercise-vue')
const firestore = firebaseApp.firestore()

export default firestore