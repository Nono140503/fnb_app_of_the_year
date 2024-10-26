// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4A42AnXS29nC8w5xgHRyBiz_AsMYmlOk",
  authDomain: "fnb-app-of-the-year.firebaseapp.com",
  projectId: "fnb-app-of-the-year",
  storageBucket: "fnb-app-of-the-year.appspot.com",
  messagingSenderId: "238805310983",
  appId: "1:238805310983:web:ceda39f073622ac3f254a2"
};


// Initialize Firebase app instance
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firestore database
const db = getFirestore(app);

// Initialize Firebase Authentication with AsyncStorage persistence
const auth = initializeAuth(app, { 
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase Storage
const storage = getStorage(app);

// Export the db, auth, and storage instances
export { db, auth, storage };
