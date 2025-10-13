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

// console.log(process.env.NEXT_PUBLIC_apiKey)
// console.log(process.env.NEXT_PUBLIC_authDomain)


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD50wN6LtolU-KvTEPDojRH3HbdmV6BNss",
//   authDomain: "fiesta-f4578.firebaseapp.com",
//   projectId: "fiesta-f4578",
//   storageBucket: "fiesta-f4578.firebasestorage.app",
//   messagingSenderId: "770244227197",
//   appId: "1:770244227197:web:a5f72e565e5b1a47cc0114",
//   measurementId: "G-T1BCL9WXL2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);






// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCeGj600EAyTgVx0cX2zEaUjECSInCWvUI",
//   authDomain: "ai-fiesta-v2.firebaseapp.com",
//   projectId: "ai-fiesta-v2",
//   storageBucket: "ai-fiesta-v2.firebasestorage.app",
//   messagingSenderId: "752537537445",
//   appId: "1:752537537445:web:45f67646e5c1235a4fb64c",
//   measurementId: "G-RHC86P3M0H"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);