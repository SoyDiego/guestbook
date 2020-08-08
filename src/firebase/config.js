// Your web app's Firebase configuration
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDbMotwsI39jv4vpzsrR4OG6LQMQ1Qgdew",
	authDomain: "guestbook-reactjs.firebaseapp.com",
	databaseURL: "https://guestbook-reactjs.firebaseio.com",
	projectId: "guestbook-reactjs",
	storageBucket: "guestbook-reactjs.appspot.com",
	messagingSenderId: "610035267810",
	appId: "1:610035267810:web:95a9950995591f3f7886bb",
	measurementId: "G-H46KPWVEQW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
