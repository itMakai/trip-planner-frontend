import React from 'react';
import { useNavigate } from 'react-router-dom';
import TripForm from '../components/TripForm';
import { Box, Typography, Container } from '@mui/material';

function HomePage() {
  const navigate = useNavigate();

  const handleTripSubmit = (tripId) => {
    navigate(`/results/${tripId}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a3c34 0%, #2a5d57 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Circles */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#FF6347' }} />
        <Box sx={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#32CD32' }} />
        <Box sx={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#D3D3D3' }} />
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
          {/* Left Section: Text */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 2,
                textTransform: 'uppercase',
              }}
            >
              Plan Your Perfect Trip
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 3, fontSize: { xs: '1.2rem', md: '1.5rem' }, color: '#b0e0e6' }}
            >
              Discover the best routes and schedules with Trip Planner’s smart technology.
              Start your journey today and make every mile count!
            </Typography>
          </Box>

          {/* Right Section: Trip Form */}
          <Box sx={{ flex: 1, width: '100%', maxWidth: 500 }}>
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                p: 3,
                color: '#1a3c34',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                Plan Your Trip
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 3, color: '#555', textAlign: 'center' }}>
                Enter your trip details to get started
              </Typography>
              <TripForm onTripCreated={handleTripSubmit} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;