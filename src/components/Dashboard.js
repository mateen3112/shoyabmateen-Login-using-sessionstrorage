import React from 'react';

const Dashboard = ({ users, onDelete, onEdit }) => {
  // Check if there are no registered users
  if (!users || users.length === 0) {
    return (
      <div>
        <h2>Registered Users</h2>
        <p>No users registered yet.</p>
      </div>
    );
  }

  // Display a list of registered users
  return (
    <div>
      <h2>Dashboard</h2>
      {users.map((user, index) => (
        <div key={index}>
          {/* Display user data based on registration form fields */}
          <p>Name: {user.name}</p>
          <p>User ID: {user.userId}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          {/* Add other registration items here */}
          {/* Add update and delete buttons */}
          <button onClick={() => onEdit(user)}>Edit Profile</button>
          <button onClick={() => onDelete(index)}>Delete Account</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
