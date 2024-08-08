// src/components/CourseCard.js

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CourseCard = ({ title, description }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="textSecondary">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
