// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW_DtVuQU_umqQKxid6WhRSpnKpCJDDEQ",
  authDomain: "chat-connect-a115e.firebaseapp.com",
  projectId: "chat-connect-a115e",
  storageBucket: "chat-connect-a115e.appspot.com",
  messagingSenderId: "293598048335",
  appId: "1:293598048335:web:156db185ae68a2bb577a3a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();