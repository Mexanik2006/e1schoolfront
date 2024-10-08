// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmxsQLpQT2__BBaP6BbP0OLjYvwiB8CEM",
    authDomain: "e1school-963d4.firebaseapp.com",
    projectId: "e1school-963d4",
    storageBucket: "e1school-963d4.appspot.com",
    messagingSenderId: "11320303222",
    appId: "1:11320303222:web:dae4d0b21da41971778957",
    measurementId: "G-PW020QTLD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app