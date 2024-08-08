// src/pages/module/ModuleList.js

import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ModuleCard from './ModuleCard';

const dummyModules = [
  {
    id: 1,
    title: 'Getting Started with JavaScript',
    description: 'Introduction to JavaScript and basic concepts.',
    content: 'Learn how to use variables, functions, and objects in JavaScript.',
    link: 'https://example.com/javascript-basics',
    course: {
      id: 1,
      title: 'Introduction to Computer Science',
    },
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'In-depth look at advanced JavaScript topics.',
    content: 'Understand closures, promises, and async/await.',
    link: 'https://example.com/advanced-javascript',
    course: {
      id: 1,
      title: 'Introduction to Computer Science',
    },
  },
  {
    id: 3,
    title: 'Responsive Web Design',
    description: 'Techniques for designing websites that work on all devices.',
    content: 'Learn about media queries, flexible grids, and responsive images.',
    link: 'https://example.com/responsive-web-design',
    course: {
      id: 3,
      title: 'Web Development',
    },
  },
];

const ModuleList = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Available Modules
      </Typography>
      <Grid container spacing={3}>
        {dummyModules.map((module) => (
          <Grid item xs={12} sm={6} md={4} key={module.id}>
            <ModuleCard module={module} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ModuleList;
