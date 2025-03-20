import React from 'react';
import { useNavigate } from 'react-router-dom';
import TripForm from '../components/TripForm';
import { Container, Typography, Box, Paper } from '@mui/material';

function HomePage() {
  const navigate = useNavigate();

  const handleTripSubmit = (tripId) => {
    navigate(`/results/${tripId}`);
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Plan Your Trip
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 3, color: '#555' }}>
          Enter your trip details to get started
        </Typography>
        <Box>
          <TripForm onTripCreated={handleTripSubmit} />
        </Box>
      </Paper>
    </Container>
  );
}

export default HomePage;