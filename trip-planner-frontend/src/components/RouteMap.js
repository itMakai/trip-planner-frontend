import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { CircularProgress, Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';

function RouteMap({ coordinates }) {
  const [isLoading, setIsLoading] = useState(true);
  const [mapCoords, setMapCoords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processCoordinates = async () => {
      try {
        // Convert [lon, lat] to [lat, lon] for Leaflet
        const leafletCoords = coordinates.map(([lon, lat]) => [lat, lon]);
        setMapCoords(leafletCoords);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to process route coordinates');
        setIsLoading(false);
      }
    };
    processCoordinates();
  }, [coordinates]);

  const center = mapCoords[Math.floor(mapCoords.length / 2)] || [40.7128, -74.0060]; // Default to NY

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <p>{error}</p>
      </Box>
    );
  }

  return (
    <MapContainer center={center} zoom={4} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={mapCoords} color="blue" />
    </MapContainer>
  );
}

export default RouteMap;