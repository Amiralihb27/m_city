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


/* !!!! use the code below only once so that you add the datas only one time if they dont exist. !!! */
const matchesCollection = collection(DB, 'matches');
const playersCollection = collection(DB , 'players');
const positionsCollection = collection(DB , 'positions');
const promotionsCollection = collection(DB , 'promotions');
const teamsCollection = collection(DB , 'teams');


// cityDB.matches.forEach(async match => {
//   try {
//     await addDoc(matchesCollection, match);
//     console.log('Match added successfully:', match);
//   } catch (error) {
//     console.error('Error adding match:', error);
//   }
// });

// cityDB.players.forEach(async player => {
//   try {
//     await addDoc(playersCollection, player);
//     console.log('Player added successfully:', player);
//   } catch (error) {
//     console.error('Error adding player:', error);
//   }
// });


// cityDB.positions.forEach(async position => {
//   try {
//     await addDoc(positionsCollection, position);
//     console.log('Position added successfully:', position);
//   } catch (error) {
//     console.error('Error adding position:', error);
//   }
// });

// cityDB.promotions.forEach(async promotion => {
//   try {
//     await addDoc(promotionsCollection, promotion);
//     console.log('Promotion added successfully:', promotion);
//   } catch (error) {
//     console.error('Error adding promotion:', error);
//   }
// });

cityDB.teams.forEach(async team => {
  try {
    await addDoc(teamsCollection, team);
    console.log('Team added successfully:', team);
  } catch (error) {
    console.error('Error adding team:', error);
  }
});

// Export auth and signInWithEmailAndPassword
export { app, auth, signInWithEmailAndPassword };
