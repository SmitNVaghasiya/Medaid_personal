import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQ7JgPgzSYZLIFHd7jddoWJzJwmHSFIP4",
  authDomain: "medaid-9cbec.firebaseapp.com",
  projectId: "medaid-9cbec",
  storageBucket: "medaid-9cbec.appspot.com",
  messagingSenderId: "179076895770",
  appId: "1:179076895770:web:fa2a5968d04b1da917eda3",
};

const firebase = initializeApp(firebaseConfig);
var auth = getAuth();

export { auth, firebase };
