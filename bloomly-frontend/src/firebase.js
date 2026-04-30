import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAicZy46iJFvaHNJOvPkLT9E_wksAOVA_o",
    authDomain: "bloomly-39607.firebaseapp.com",
    projectId: "bloomly-39607",
    storageBucket: "bloomly-39607.firebasestorage.app",
    messagingSenderId: "1044264296437",
    appId: "1:1044264296437:web:5dfbc34c93e8cc20190abc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services and EXPORT them
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;