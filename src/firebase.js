import {initializeApp} from "firebase/app";
import { getAuth ,signInWithEmailAndPassword} from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyCzKIEr4w_6KKzFmf4exXlVhJBbZShrrPQ",
    authDomain: "mcity-d029b.firebaseapp.com",
    projectId: "mcity-d029b",
    storageBucket: "mcity-d029b.appspot.com",
    messagingSenderId: "85351589719",
    appId: "1:85351589719:web:490b28a92af5eac64c8012",
    measurementId: "G-0SQR3LF1DT"
  };


  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app);


  export {app ,auth,signInWithEmailAndPassword};