import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RouteMap from '../components/RouteMap';
import EldLogsTable from '../components/EldLogsTable';
import { Container, Typography, Box, Button, CircularProgress, Paper } from '@mui/material';

function ResultsPage() {
  const { tripId } = useParams();
  const [routeData, setRouteData] = useState(null);
  const [eldLogs, setEldLogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNetworkError, setIsNetworkError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const config = { timeout: 15000 };
      try {
        setLoading(true);
        setError(null);
        setIsNetworkError(false);
        const response = await axios.get(`http://127.0.0.1:8000/api/trips/${tripId}/calculate_route/`, config);
        setRouteData(response.data.route);
        setEldLogs(response.data.eld_logs);
        console.log('Route Data:', response.data.route); // Debug route data
        console.log('ELD Logs:', response.data.eld_logs);
        setLoading(false);
      } catch (err) {
        if (err.code === 'ECONNABORTED' || !err.response) {
          setIsNetworkError(true);
        } else {
          setError(err.response?.data?.error || 'Failed to load trip data');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [tripId]);

  const handleDownloadPdf = async () => {
    const config = { timeout: 15000, responseType: 'blob' };
    try {
      setError(null);
      setIsNetworkError(false);
      const response = await axios.get(`http://127.0.0.1:8000/api/trips/${tripId}/download_eld_logs/`, config);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `eld_logs_trip_${tripId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      if (err.code === 'ECONNABORTED' || !err.response) {
        setIsNetworkError(true);
      } else {
        setError(err.response?.data?.error || 'Failed to download PDF');
      }
    }
  };

  const handleRetry = () => {
    const fetchData = async () => {
      const config = { timeout: 15000 };
      try {
        setLoading(true);
        setError(null);
        setIsNetworkError(false);
        const response = await axios.get(`http://127.0.0.1:8000/api/trips/${tripId}/calculate_route/`, config);
        setRouteData(response.data.route);
        setEldLogs(response.data.eld_logs);
        console.log('Route Data:', response.data.route); // Debug route data
        console.log('ELD Logs:', response.data.eld_logs);
        setLoading(false);
      } catch (err) {
        if (err.code === 'ECONNABORTED' || !err.response) {
          setIsNetworkError(true);
        } else {
          setError(err.response?.data?.error || 'Failed to load trip data');
        }
        setLoading(false);
      }
    };

    fetchData();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
          borderRadius: 3,
          width: '100%',
          maxWidth: 800,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: '#0288d1', fontWeight: 'bold', mb: 3 }}
        >
          Trip Results
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress size={60} sx={{ color: '#0288d1' }} />
          </Box>
        ) : isNetworkError ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '50vh', justifyContent: 'center' }}>
            <Typography color="error" sx={{ mb: 2 }}>
              No internet connection, please retry
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRetry}
              sx={{ backgroundColor: '#0288d1', '&:hover': { backgroundColor: '#0277bd' } }}
            >
              Retry
            </Button>
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ my: 4 }}>
            {error}
          </Typography>
        ) : (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ color: '#0277bd', mb: 2 }}>
                Route Map
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {routeData && routeData.coordinates ? (
                  <RouteMap coordinates={routeData.coordinates} mapStyle={{ width: '100%', maxWidth: 600, height: 300 }} />
                ) : (
                  <Typography color="error">No route data available to display the map.</Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#0277bd', mb: 2 }}>
                ELD Logs
              </Typography>
              <EldLogsTable logs={eldLogs} />
              <Button
                variant="contained"
                color="primary"
                onClick={handleDownloadPdf}
                sx={{
                  mt: 3,
                  backgroundColor: '#0288d1',
                  '&:hover': { backgroundColor: '#0277bd' },
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                }}
              >
                Download PDF
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default ResultsPage;