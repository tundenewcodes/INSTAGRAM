// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyACU5CFFSIC1GKWePoQvJr2IYnCXbwdiaI',
    authDomain: 'instagram-clone-dc779.firebaseapp.com',
    projectId: 'instagram-clone-dc779',
    storageBucket: 'instagram-clone-dc779.appspot.com',
    messagingSenderId: '1075867870965',
    appId: '1:1075867870965:web:3edd16c147fbf3145987bc',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const storage = getStorage(app)

export {
    app,
    db,
    storage
}