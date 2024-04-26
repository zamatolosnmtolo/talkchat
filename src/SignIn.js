import React, { useState } from 'react';

function SignIn({ signInWithGoogle, handleSignInWithEmail }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignInWithEmail(email, password);
  };

  return (
    <div className="sign-in-container">
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <button type="button" onClick={signInWithGoogle}>Sign In with Google</button>
      </form>
    </div>
  );
}

export default SignIn;
