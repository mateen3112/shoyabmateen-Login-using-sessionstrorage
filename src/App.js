import React, { useState } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ani from './assests/ani.json';

import './App.css';

// Styled components for navbar and footer
const Navbar = styled.nav`
  background-color: #007F73;
  padding: 20px 0;
`;

const Footer = styled.footer`
  background-color: #4CCD99;
  padding: 20px 0;
  color: white;
`;

// Main App component
function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleNavClick = (pageName) => {
    setPage(pageName);
  };

  const handleRegistration = (userData) => {
    setUser(userData);
    setRegisteredUsers([...registeredUsers, userData]);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setPage('home');
  };

  const handleDelete = (index) => {
    const updatedUsers = [...registeredUsers];
    updatedUsers.splice(index, 1);
    setRegisteredUsers(updatedUsers);
  };

  const handleEdit = (index, updatedUserData) => {
    const updatedUsers = [...registeredUsers];
    updatedUsers[index] = updatedUserData;
    setRegisteredUsers(updatedUsers);
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
    <div className="App">
      <Navbar className="navbar">
  <button onClick={() => handleNavClick('home')}>Home</button>
  <button onClick={() => handleNavClick('registration')}>Register</button>
  <button onClick={() => handleNavClick('login')}>Login</button>
  <button onClick={() => handleNavClick('dashboard')}>Dashboard</button>
</Navbar>

      {page === 'home' && (
        <div>
         
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}

      {page === 'registration' && <RegistrationForm onRegister={handleRegistration} />}
      {page === 'login' && <LoginForm onLogin={handleLogin} registeredUsers={registeredUsers} />}
      {page === 'dashboard' && (
        <Dashboard
          users={registeredUsers}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onLogout={handleLogout}
        />
      )}
<Footer className="footer">@shoyabmateen 2024</Footer>
    </div>
  );
}

export default App;
