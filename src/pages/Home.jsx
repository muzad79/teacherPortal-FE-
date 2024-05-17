import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex justify-center items-center">
      <Container maxWidth="md">
        <div className="text-center">
          <Typography variant="h3" component="h1" className="text-white font-bold mb-4">
            Welcome to Teacher Portal
          </Typography>
          <Typography variant="body1" className="text-white mb-6">
            A platform to manage your teaching activities efficiently.
          </Typography>
          <Button variant="contained" color="primary" size="large" href="/login">
            Get Started
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
