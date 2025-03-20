import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function EldLogsTable({ logs }) {
  return (
    <TableContainer component={Paper}>
      {logs.map((log) => (
        <div key={log.day}>
          <Typography variant="subtitle1" sx={{ p: 2 }}>
            Day {log.day}
          </Typography>
          <Table sx={{ mb: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Activity</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {log.day === 1 && (
                <TableRow>
                  <TableCell>Pickup</TableCell>
                  <TableCell>1 hr</TableCell>
                </TableRow>
              )}
              {log.entries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}</TableCell>
                  <TableCell>
                    {entry.type === 'driving' ? `${Math.round(entry.hours)} hrs, ${Math.round(entry.miles)} miles` :
                     entry.type === 'break' ? `${entry.duration.toFixed(1)} hrs` :
                     `${entry.count} stops`}
                  </TableCell>
                </TableRow>
              ))}
              {log.day === logs.length && (
                <TableRow>
                  <TableCell>Dropoff</TableCell>
                  <TableCell>1 hr</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ))}
    </TableContainer>
  );
}

export default EldLogsTable;