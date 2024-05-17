import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, name, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar className="justify-between">
        <Link to={'/'}>
        <Typography variant="h6" component="div">
          Teacher Portal
        </Typography>
        </Link>
      
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Typography variant="body1" component="div">
                Welcome, {name}
              </Typography>
              <Link to="/dashboard" className="text-white">
                Dashboard
              </Link>
              <button
                onClick={onLogout}
                className="text-white bg-blue-500 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
