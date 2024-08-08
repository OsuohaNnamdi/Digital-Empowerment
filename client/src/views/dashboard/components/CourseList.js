// src/components/CourseList.js

import React from 'react';
import { Grid } from '@mui/material';
import CourseCard from './CourseCard';

const CourseList = ({ courses }) => {
  return (
    <Grid container spacing={3}>
      {courses.map(course => (
        <Grid item xs={12} sm={6} md={4} key={course.id}>
          <CourseCard title={course.title} description={course.description} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseList;
