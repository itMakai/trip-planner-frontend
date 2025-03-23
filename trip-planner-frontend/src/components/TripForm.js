import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';

function TripForm({ onTripCreated }) {
  const [formData, setFormData] = useState({
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    cycle_hours_used: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const config = {
      timeout: 10000, // 10 seconds timeout
    };
    let retries = 3;
  
    while (retries > 0) {
      try {
        const response = await axios.post('https://eld-log-generator.onrender.com/api/trips/', {
          ...formData,
          cycle_hours_used: parseFloat(formData.cycle_hours_used) || 0,
        }, config);
        setLoading(false);
        onTripCreated(response.data.id);
        return; // Success, exit the loop
      } catch (err) {
        if (err.code === 'ECONNABORTED') {
          retries -= 1;
          setError(`Connection timed out, ${retries} retries left`);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
        } else {
          setError(err.response?.data?.error || 'Failed to create trip');
          setLoading(false);
          return;
        }
      }
    }
    setError('Failed to create trip after retries due to slow connection');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Current Location"
          name="current_location"
          value={formData.current_location}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: '#fff', borderRadius: 1 }}
        />
        <TextField
          label="Pickup Location"
          name="pickup_location"
          value={formData.pickup_location}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: '#fff', borderRadius: 1 }}
        />
        <TextField
          label="Dropoff Location"
          name="dropoff_location"
          value={formData.dropoff_location}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: '#fff', borderRadius: 1 }}
        />
        <TextField
          label="Cycle Hours Used"
          name="cycle_hours_used"
          type="number"
          value={formData.cycle_hours_used}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          inputProps={{ step: '0.1', min: '0', max: '70' }}
          sx={{ backgroundColor: '#fff', borderRadius: 1 }}
        />
        {error && (
          <Typography color="error" align="center" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Plan Trip'}
        </Button>
      </Box>
    </form>
  );
}

export default TripForm;