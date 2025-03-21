import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

function EldLogsTable({ logs }) {
  const canvasRefs = useRef([]);

  useEffect(() => {
    (logs || []).forEach((log, index) => {
      const canvas = canvasRefs.current[index];
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const containerWidth = canvas.parentElement.clientWidth; // Get the parent container's width
      const width = Math.min(containerWidth, 880); // Use the smaller of the container width or 880
      canvas.width = width; // Set canvas width dynamically
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Constants
      const activityTypes = ['pickup', 'driving', 'break', 'fuel', 'dropoff'];
      const rowHeight = 40;
      const labelWidth = 80;
      const timelineWidth = width - labelWidth;
      const pixelsPerHour = timelineWidth / 24;
      const colors = {
        pickup: '#FF6347', // Tomato
        driving: '#FFD700', // Gold
        break: '#4682B4', // SteelBlue
        fuel: '#32CD32', // LimeGreen
        dropoff: '#FF4500', // OrangeRed
      };

      // Draw labels on the left
      activityTypes.forEach((type, i) => {
        const y = 40 + i * rowHeight + rowHeight / 2;
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.fillText(type.charAt(0).toUpperCase() + type.slice(1), 5, y);
      });

      // Draw timeline (sticks and hour labels) at the top
      for (let hour = 0; hour <= 24; hour++) {
        const x = labelWidth + hour * pixelsPerHour;
        ctx.font = '10px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(hour.toString(), x, 25);

        for (let half = 0; half < 2; half++) {
          const xHalf = x + half * (pixelsPerHour / 2);
          ctx.beginPath();
          ctx.moveTo(xHalf, 30);
          ctx.lineTo(xHalf, 40);
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        for (let third = 0; third < 3; third++) {
          const xThird = x + third * (pixelsPerHour / 3);
          if (third === 0 || third === 1.5) continue;
          ctx.beginPath();
          ctx.moveTo(xThird, 30);
          ctx.lineTo(xThird, 35);
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw grid (rows and columns)
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 0.5;
      for (let hour = 0; hour <= 24; hour++) {
        const x = labelWidth + hour * pixelsPerHour;
        ctx.beginPath();
        ctx.moveTo(x, 40);
        ctx.lineTo(x, 40 + activityTypes.length * rowHeight);
        ctx.stroke();
      }
      for (let i = 0; i <= activityTypes.length; i++) {
        const y = 40 + i * rowHeight;
        ctx.beginPath();
        ctx.moveTo(labelWidth, y);
        ctx.lineTo(labelWidth + timelineWidth, y);
        ctx.stroke();
      }

      // Draw small sticks in each row
      activityTypes.forEach((_, rowIndex) => {
        const yBase = 40 + rowIndex * rowHeight;
        for (let hour = 0; hour <= 24; hour++) {
          const x = labelWidth + hour * pixelsPerHour;
          for (let half = 0; half < 2; half++) {
            const xHalf = x + half * (pixelsPerHour / 2);
            ctx.beginPath();
            ctx.moveTo(xHalf, yBase + rowHeight - 10);
            ctx.lineTo(xHalf, yBase + rowHeight);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          for (let third = 0; third < 3; third++) {
            const xThird = x + third * (pixelsPerHour / 3);
            if (third === 0 || third === 1.5) continue;
            ctx.beginPath();
            ctx.moveTo(xThird, yBase + rowHeight - 5);
            ctx.lineTo(xThird, yBase + rowHeight);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      // Draw activities and transition lines between different activities
      const activities = log.activities || [];
      let lastActivity = null;
      activities.forEach((activity) => {
        const rowIndex = activityTypes.indexOf(activity.type);
        if (rowIndex === -1) return;

        const startX = labelWidth + activity.start * pixelsPerHour;
        const endX = labelWidth + activity.end * pixelsPerHour;
        const y = 40 + rowIndex * rowHeight + rowHeight / 2 - 5;

        // Activity line
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.strokeStyle = colors[activity.type] || 'gray';
        ctx.lineWidth = 8;
        ctx.stroke();

        // Transition line to the next activity (if different type)
        if (lastActivity && lastActivity.type !== activity.type) {
          const prevEndX = labelWidth + lastActivity.end * pixelsPerHour;
          const prevRowIndex = activityTypes.indexOf(lastActivity.type);
          const prevY = 40 + prevRowIndex * rowHeight + rowHeight / 2 - 5;

          ctx.beginPath();
          ctx.moveTo(prevEndX, prevY);
          ctx.lineTo(prevEndX, prevY + (y - prevY) / 2);
          ctx.lineTo(startX, prevY + (y - prevY) / 2);
          ctx.lineTo(startX, y);
          ctx.strokeStyle = colors[lastActivity.type] || 'gray';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Transition line within the same activity type
        if (lastActivity && lastActivity.type === activity.type) {
          const prevEndX = labelWidth + lastActivity.end * pixelsPerHour;
          ctx.beginPath();
          ctx.moveTo(prevEndX, y - rowHeight / 4);
          ctx.lineTo(prevEndX, y + rowHeight / 4);
          ctx.lineTo(startX, y + rowHeight / 4);
          ctx.lineTo(startX, y - rowHeight / 4);
          ctx.lineTo(prevEndX, y - rowHeight / 4);
          ctx.strokeStyle = colors[activity.type] || 'gray';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        lastActivity = activity;

        // Start and end times
        ctx.font = '8px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        const startTime = formatTime(activity.start);
        const endTime = formatTime(activity.end);
        ctx.fillText(startTime, startX + 2, y - 5);
        ctx.fillText(endTime, endX - 30, y - 5);

        // Miles for driving
        if (activity.type === 'driving') {
          ctx.textAlign = 'center';
          ctx.fillText(`${activity.miles} miles`, (startX + endX) / 2, y - 5);
        }
      });
    });
  }, [logs]);

  // Helper to format time (e.g., 11.5 → 11:30)
  const formatTime = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return (
    <Box>
      {(logs || []).map((log, index) => (
        <Box key={log.day} sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ p: 2 }}>
            Day {log.day}
          </Typography>
          <canvas
            ref={(el) => (canvasRefs.current[index] = el)}
            width={880} // This will be overridden by the useEffect
            height={240}
            style={{ border: '1px solid #ccc', maxWidth: '100%' }} // Ensure canvas doesn't exceed container
          />
        </Box>
      ))}
    </Box>
  );
}

export default EldLogsTable;