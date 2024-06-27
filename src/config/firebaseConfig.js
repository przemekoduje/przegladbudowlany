import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD31vEE8N4WMvcfLYmjOinyw5vFlp2UjaM",
  authDomain: "pb-database-1f716.firebaseapp.com",
  projectId: "pb-database-1f716",
  storageBucket: "pb-database-1f716.appspot.com",
  messagingSenderId: "310903527625",
  appId: "1:310903527625:web:349a1badf1a7489fbcd518",
  measurementId: "G-V35191D7SP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { provider }
export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app)
