import 'firebase/firestore'
import 'firebase/storage'
import firebase from 'firebase';
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyC0lgDcmQQGkuX9brylWneHDoyTJO7ztKI",
    authDomain: "pizza-5f900.firebaseapp.com",
    databaseURL: "https://pizza-5f900.firebaseio.com",
    projectId: "pizza-5f900",
    storageBucket: "pizza-5f900.appspot.com",
    messagingSenderId: "80634414945",
    appId: "1:80634414945:web:df783015c9f05f46d2e720",
    measurementId: "G-3TDGV0MV2E"   
};

export const fb = firebase.initializeApp(config)
export const db = fb.database()
export const productRef = db.ref('pizza')