import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHhthGV03ELDE5DQQTzyKQlp9KAhc3f-8",
  authDomain: "itiner-trip.firebaseapp.com",
  projectId: "itiner-trip",
  storageBucket: "itiner-trip.appspot.com",
  messagingSenderId: "145321971331",
  appId: "1:145321971331:web:ca140cbac32de6c4c615b6",
  measurementId: "G-RKL1M5E2TG",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true, merge: true });
export const storage = getStorage(app);

// const analytics = getAnalytics(app);

export default firebase;

