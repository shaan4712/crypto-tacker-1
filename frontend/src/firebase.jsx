import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBJsEm8StgB0mzYy6b29QY44KpSJgr2jC4",
  authDomain: "cryptotracker-31090.firebaseapp.com",
  projectId: "cryptotracker-31090",
  storageBucket: "cryptotracker-31090.firebasestorage.app",
  messagingSenderId: "723937704177",
  appId: "1:723937704177:web:cab7b155ea74648c3c1150",
  measurementId: "G-NFQGW4W3MC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;