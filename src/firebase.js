import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

// Export auth and signInWithEmailAndPassword
export { app, auth, signInWithEmailAndPassword };
