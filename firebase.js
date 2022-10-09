// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2AOwB_mbuoyvpMTs4ybFfP21fmT7xOGA",
  authDomain: "signal-clone-3b4c6.firebaseapp.com",
  projectId: "signal-clone-3b4c6",
  storageBucket: "signal-clone-3b4c6.appspot.com",
  messagingSenderId: "1094516811900",
  appId: "1:1094516811900:web:de7b11a36544e1a95381f9",
  measurementId: "G-SM6HMP19M5",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
