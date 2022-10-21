import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUDEHjTh9wu0vOKt_NsoA8uFp268LIQYs",
  authDomain: "todo-with-firebase-b37a0.firebaseapp.com",
  projectId: "todo-with-firebase-b37a0",
  storageBucket: "todo-with-firebase-b37a0.appspot.com",
  messagingSenderId: "1058494210155",
  appId: "1:1058494210155:web:849f4c165f62cdab1dd12e",
  measurementId: "G-QC6PL0FFJL"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
