import * as firebase from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyCcGd3cBHMui9AP_QpAB6qCILPlEwuMzXI",
    authDomain: "fit-frail.firebaseapp.com",
    databaseURL: "https://fit-frail-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fit-frail",
    storageBucket: "fit-frail.appspot.com",
    messagingSenderId: "57115135655",
    appId: "1:57115135655:web:fd28b722d93510f44d1582",
    measurementId: "G-W2GFMMBHJF"
};


const app = firebase.initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { db, auth }

