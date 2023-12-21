// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDL8FkvQ8ZmZYH_U9qw6LaqfqVQlu8QOg",
  authDomain: "task-vault-hub.firebaseapp.com",
  projectId: "task-vault-hub",
  storageBucket: "task-vault-hub.appspot.com",
  messagingSenderId: "189688940734",
  appId: "1:189688940734:web:f58395ff2d18640e5ab6ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;