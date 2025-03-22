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
        background: 'linear-gradient(135deg, #0d2c24 0%, #1f4d46 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        px: 3,
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 40,
          left: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#FF4500' }} />
        <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#00FA9A' }} />
        <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#C0C0C0' }} />
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 5 }}>
          {/* Left Section: Text */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 3,
                textTransform: 'uppercase',
                color: '#FFD700',
              }}
            >
              Plan Your Perfect Trip
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                color: '#b0e0e6',
                maxWidth: 600,
              }}
            >
              Discover the best routes and schedules with Trip Planner’s smart technology. Start your journey today and make every mile count!
            </Typography>
          </Box>

          {/* Right Section: Trip Form */}
          <Box sx={{ flex: 1, width: '100%', maxWidth: 500 }}>
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 3,
                p: 4,
                color: '#1a3c34',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
                Plan Your Trip
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 3, color: '#666', textAlign: 'center' }}>
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
