// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqKpDEs5WKRsoA0VG7wTA49gAMNc127O0",
    authDomain: "new-bajar-395fa.firebaseapp.com",
    databaseURL: "https://new-bajar-395fa-default-rtdb.firebaseio.com",
    projectId: "new-bajar-395fa",
    storageBucket: "new-bajar-395fa.firebasestorage.app",
    messagingSenderId: "572328137653",
    appId: "1:572328137653:web:7da1b90a28432b3b813ffc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);








