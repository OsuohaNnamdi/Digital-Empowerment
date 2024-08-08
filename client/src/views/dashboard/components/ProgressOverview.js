// src/components/ProgressOverview.js

import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';

const ProgressOverview = ({ progressData }) => {
  return (
    <Box>
      {progressData.map(({ courseId, completion, timeSpent }) => (
        <Card key={courseId} style={{ marginBottom: '16px' }}>
          <CardContent>
            <Typography variant="h6">Course ID: {courseId}</Typography>
            <Typography variant="body2">Completion: {completion}%</Typography>
            <LinearProgress variant="determinate" value={completion} />
            <Typography variant="body2">Time Spent: {timeSpent}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ProgressOverview;
