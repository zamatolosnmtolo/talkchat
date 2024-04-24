import React from 'react';
import './App.css';

import firebase from 'firebase/compat/app'; 
     import 'firebase/compat/firestore';
     import 'firebase/compat/auth';         

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/auth'

firebase.initializeApp({  apiKey: "AIzaSyDnB3pL_OA7sCsLK3nJJVmTtELhPZhOEi8",
authDomain: "talkchat-4ecb5.firebaseapp.com",
projectId: "talkchat-4ecb5",
storageBucket: "talkchat-4ecb5.appspot.com",
messagingSenderId: "246912064543",
appId: "1:246912064543:web:1929997bf1d6a723fb892a",
measurementId: "G-1W07JSELSC"})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
