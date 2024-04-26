import React, { useRef, useState } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import SignIn from './SignIn';

firebase.initializeApp({
  apiKey: "AIzaSyDnB3pL_OA7sCsLK3nJJVmTtELhPZhOEi8",
  authDomain: "talkchat-4ecb5.firebaseapp.com",
  projectId: "talkchat-4ecb5",
  storageBucket: "talkchat-4ecb5.appspot.com",
  messagingSenderId: "246912064543",
  appId: "1:246912064543:web:1929997bf1d6a723fb892a",
  measurementId: "G-1W07JSELSC"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .catch(error => {
        if (error.code === 'auth/cancelled-popup-request') {
          console.log('Popup request cancelled');
        } else {
          console.error('Authentication error:', error.message);
        }
      });
  };

  const handleSignInWithEmail = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Authentication error:', errorCode, errorMessage);
      });
  };

  return (
    <div className="App">
      <header>
        <h1>TalkChat App</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn signInWithGoogle={signInWithGoogle} handleSignInWithEmail={handleSignInWithEmail} />}
      </section>
    </div>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  const deleteMessage = async (messageId) => {
    const messageRef = messagesRef.doc(messageId);

    try {
      await messageRef.delete();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const replyToMessage = async (message) => {
    setFormValue(`@${message.uid} `);
  };

  return (
    <>
      <main>
        {messages && messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} onDelete={deleteMessage} onReply={replyToMessage} auth={auth} />
        ))}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
        <button type="submit" disabled={!formValue}>Send</button>
      </form>
    </>
  );
}

export default App;
