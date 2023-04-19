// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYPQoGDpu8J-PI9-ekaJjlCZBq_Obx6Eg",
  authDomain: "simple-firebase-639c3.firebaseapp.com",
  projectId: "simple-firebase-639c3",
  storageBucket: "simple-firebase-639c3.appspot.com",
  messagingSenderId: "315628399992",
  appId: "1:315628399992:web:5966cb564bc5af2aba6c8d",
  measurementId: "G-EMPT8QB176"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;