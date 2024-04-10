// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
 initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);