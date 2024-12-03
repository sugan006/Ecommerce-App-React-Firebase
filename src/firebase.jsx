import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0ydHeQ4C1eKByyh-mdrUA0A0n21XfSCY",
  authDomain: "sample-firebase-project-470ef.firebaseapp.com",
  projectId: "sample-firebase-project-470ef",
  storageBucket: "sample-firebase-project-470ef.firebasestorage.app",
  messagingSenderId: "825491338306",
  appId: "1:825491338306:web:82b959327d09c594a1e9db",
  measurementId: "G-3CSLF6WGTS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, collection, addDoc };
