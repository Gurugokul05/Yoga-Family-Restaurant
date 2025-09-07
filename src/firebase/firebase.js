
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //firebase api here
  apiKey: "AIzaSyA8z0towB5vmUMhQrNWH1g5sJ9xNUAgyKo",
  authDomain: "yoga-restaurant-4a2a5.firebaseapp.com",
  projectId: "yoga-restaurant-4a2a5",
  storageBucket: "yoga-restaurant-4a2a5.firebasestorage.app",
  messagingSenderId: "668903684943",
  appId: "1:668903684943:web:3daca149365ab0e9ea233a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,db ,app};
