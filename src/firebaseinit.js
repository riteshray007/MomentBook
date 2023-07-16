// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD9XzluttQJliu8yamHLAK9Ovb_eGqz1Y",
  authDomain: "momentbook-4d878.firebaseapp.com",
  projectId: "momentbook-4d878",
  storageBucket: "momentbook-4d878.appspot.com",
  messagingSenderId: "408044931512",
  appId: "1:408044931512:web:ec715f73e65d26d7ade74d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);