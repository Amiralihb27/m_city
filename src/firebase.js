import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { cityDB } from './temp/m-city-export';

// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCzKIEr4w_6KKzFmf4exXlVhJBbZShrrPQ",
  authDomain: "mcity-d029b.firebaseapp.com",
  projectId: "mcity-d029b",
  storageBucket: "mcity-d029b.appspot.com",
  messagingSenderId: "85351589719",
  appId: "1:85351589719:web:490b28a92af5eac64c8012",
  measurementId: "G-0SQR3LF1DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const DB = getFirestore(app);
// Adding matches to Firestore


// const matchesCollection = collection(DB, 'matches');

// cityDB.matches.forEach(async match => {
//   try {
//     await addDoc(matchesCollection, match);
//     console.log('Match added successfully:', match);
//   } catch (error) {
//     console.error('Error adding match:', error);
//   }
// });

// Export auth and signInWithEmailAndPassword
export { app, auth, signInWithEmailAndPassword };
