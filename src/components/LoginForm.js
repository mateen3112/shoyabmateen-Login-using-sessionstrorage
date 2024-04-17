import React, { useState } from 'react';
import Lottie from 'react-lottie';
import './log.css'; // Import the CSS file for styling
import log from '../assests/log.json'; // Assuming the animation file is stored in assets folder

const LoginForm = ({ onLogin, registeredUsers }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!registeredUsers) {
      setError('No registered users found.');
      return;
    }
    
    const user = registeredUsers.find((user) => user.userId === userId && user.password === password);

    if (user) {
      onLogin(user);
      setError('');
      alert(`Hello ${user.userId}! Welcome!`); // Display welcome message
    } else {
      setError('Invalid user ID or password.');
    }
  };

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: log,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="login-container">
      <div className="animation-container">
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
      <div className="form-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
