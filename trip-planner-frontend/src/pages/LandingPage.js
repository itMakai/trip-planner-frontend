import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

function LandingPage() {
  const navigate = useNavigate();

  const handlePlanTrip = () => {
    navigate('/plan-trip');
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
          {/* Left Section: Text and Button */}
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
            <Button
              variant="contained"
              onClick={handlePlanTrip}
              sx={{
                backgroundColor: '#32CD32',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                '&:hover': { backgroundColor: '#28a428' },
              }}
            >
              Plan Your Trip Now
            </Button>
            {/* App Store Buttons */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 2 }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="App Store"
                style={{ height: 40 }}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                style={{ height: 40 }}
              />
            </Box>
          </Box>

          {/* Right Section: Phone Mockup (Removed for Now) */}
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }}>
            {/* Placeholder for phone mockup */}
            <Box
              sx={{
                width: 300,
                height: 500,
                backgroundColor: '#e0e0e0',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
              }}
            >
              <Typography>Phone Mockup Placeholder</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LandingPage;