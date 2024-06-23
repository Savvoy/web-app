// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABItWtfHiGSFenxgjwVRR8ktZw0iH3pTk",
  authDomain: "parse-a035e.firebaseapp.com",
  projectId: "parse-a035e",
  storageBucket: "parse-a035e.appspot.com",
  messagingSenderId: "901881343914",
  appId: "1:901881343914:web:b80f708ac46e00156345d3",
  measurementId: "G-HQSMH00D29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});