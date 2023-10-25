// Import necessary libraries
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC3-bdGmOjW4z5Y63ip5UjyOQ76Y95v8o",
  authDomain: "pakdem.firebaseapp.com",
  projectId: "pakdem",
  storageBucket: "pakdem.appspot.com",
  messagingSenderId: "323059572929",
  appId: "1:323059572929:web:8f241a4dbe65137917f440",
  measurementId: "G-1GSD9C5WNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get storage instance
const storage = getStorage(app);

export { storage };
