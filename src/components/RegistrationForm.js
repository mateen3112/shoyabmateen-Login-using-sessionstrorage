import React, { useState } from 'react';
import Lottie from 'react-lottie'; // Import Lottie
import './reg.css'; // Import the CSS file for registration form styles
import ani from '../assests/reg.json'; // Import the animation JSON file

const RegistrationForm = ({ onRegister }) => {
  const [userData, setUserData] = useState({
    name: '',
    userId: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    
    const storedUsers = JSON.parse(sessionStorage.getItem('registeredUsers') || '[]');
    const isAlreadyRegistered = storedUsers.some(user => user.userId === userData.userId);
    
    if (isAlreadyRegistered) {
      alert('User already registered!');
      return;
    }

    // Store the registered user data in sessionStorage
    sessionStorage.setItem('registeredUsers', JSON.stringify([...storedUsers, userData]));
    alert('Successfully registered!');
    
    // Clear the form fields
    setUserData({
      name: '',
      userId: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    });

    // Show success message
    setSuccess(true);

    // Call the onRegister callback function if provided
    if (onRegister) {
      onRegister(userData);
    }

    // Prevent navigation
    return false;
  };

  const handleOkClick = () => {
    // Reset the success state when "OK" is clicked
    setSuccess(false);
  };

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ani,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="registration-container">
      <div className="animation-container">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="form-container">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={userData.name} onChange={handleChange} required />
          <input type="text" name="userId" placeholder="User ID" value={userData.userId} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} required />
          <input type="tel" name="phoneNumber" placeholder="Phone Number" value={userData.phoneNumber} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={userData.confirmPassword} onChange={handleChange} required />
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Registration successful!</p>}
          <button type="submit">Register</button>
        </form>
        {/* Display the "OK" button only when success message is shown */}
        {success && <button className="ok-button" onClick={handleOkClick}>OK</button>}
      </div>
    </div>
  );
};

export default RegistrationForm;
