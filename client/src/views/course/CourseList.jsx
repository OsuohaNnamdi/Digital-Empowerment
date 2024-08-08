// src/pages/course/CourseList.js

import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import CourseCard from './CourseCard';

const dummyCourses = [
    {
        id: 1,
        title: 'Introduction to Computer Science',
        description: 'Learn the basics of computer science and programming.',
      },
      {
        id: 2,
        title: 'Advanced Algorithms',
        description: 'Deep dive into complex algorithms and data structures.',
      },
      {
        id: 3,
        title: 'Web Development',
        description: 'Build and design modern web applications.',
      },
    
    ]

const CourseList = () => {
    return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Available Courses
          </Typography>
          <Grid container spacing={3}>
            {dummyCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    };

    export default CourseList;