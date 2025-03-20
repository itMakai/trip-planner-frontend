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

  const fetchData = async () => {
    const config = { timeout: 15000 };
    try {
      setLoading(true);
      setError(null);
      setIsNetworkError(false);
      const response = await axios.get(`http://127.0.0.1:8000/api/trips/${tripId}/calculate_route/`, config);
      setRouteData(response.data.route);
      setEldLogs(response.data.eld_logs);
      setLoading(false);
    } catch (err) {
      if (err.code === 'ECONNABORTED' || !err.response) {
        // Network-related error (timeout or no response)
        setIsNetworkError(true);
      } else {
        // Backend-specific error
        setError(err.response?.data?.error || 'Failed to load trip data');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
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
    fetchData();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#0288d1', fontWeight: 'bold' }}>
          Trip Results
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress size={60} sx={{ color: '#0288d1' }} />
          </Box>
        ) : isNetworkError ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '50vh', justifyContent: 'center' }}>
            <Typography color="error" align="center" sx={{ mb: 2 }}>
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
          <Typography color="error" align="center" sx={{ my: 4 }}>
            {error}
          </Typography>
        ) : (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ color: '#0277bd' }}>Route Map</Typography>
              <RouteMap coordinates={routeData.coordinates} />
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: '#0277bd' }}>
                ELD Logs
              </Typography>
              <EldLogsTable logs={eldLogs} />
              <Button
                variant="contained"
                color="primary"
                onClick={handleDownloadPdf}
                sx={{ mt: 2, backgroundColor: '#0288d1', '&:hover': { backgroundColor: '#0277bd' } }}
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