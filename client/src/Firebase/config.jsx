// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';
import {getFirestore  } from 'firebase/firestore';
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3UzqGcjzm3acIGI4NiuNl2wO8gQUqsU0",
  authDomain: "bivureact.firebaseapp.com",
  projectId: "bivureact",
  storageBucket: "bivureact.appspot.com",
  messagingSenderId: "74266932454",
  appId: "1:74266932454:web:f8440d44c5b41423b6b727",
  measurementId: "G-ETQL49R3BS"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const imgDB = getStorage(app)
const txtDB = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {
  imgDB,
  txtDB,
  auth,
  provider,
}