// src/pages/course/CourseCard.js

import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

const CourseCard = ({ course }) => {
  return (
    <Card elevation={3} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {course.description}
        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="contained" color="primary">
            View Modules
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
