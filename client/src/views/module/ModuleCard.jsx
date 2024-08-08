// src/pages/module/ModuleCard.js

import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const ModuleCard = ({ module }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {module.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {module.description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {module.content}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Course: {module.course.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={Link} to={`/quizzes/${module.id}`}>
          View Quizzes
        </Button>
        <Button size="small" color="primary" href={module.link} target="_blank">
          View Content
        </Button>
      </CardActions>
    </Card>
  );
};

export default ModuleCard;
