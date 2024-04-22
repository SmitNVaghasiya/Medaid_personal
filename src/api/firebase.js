import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwg9cE6bWtZgAMFqW_K_vSyMuV2cQr9rE",
  authDomain: "medaid-895c9.firebaseapp.com",
  projectId: "medaid-895c9",
  storageBucket: "medaid-895c9.appspot.com",
  messagingSenderId: "331803034642",
  appId: "1:331803034642:web:b70d3f164336f5fc5104cb",
  measurementId: "G-VKLSCZM2PV",
};

const firebase = initializeApp(firebaseConfig);
var auth = getAuth();

export { auth, firebase };
