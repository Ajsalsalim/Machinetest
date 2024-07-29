// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnQeCPBwRw2bDqpBDK5ZAQxV-UovXtdEM",
  authDomain: "machinetest-caecc.firebaseapp.com",
  projectId: "machinetest-caecc",
  storageBucket: "machinetest-caecc.appspot.com",
  messagingSenderId: "833854802796",
  appId: "1:833854802796:web:80e7446373ee2e929f8149",
  measurementId: "G-KK07EB9PQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);