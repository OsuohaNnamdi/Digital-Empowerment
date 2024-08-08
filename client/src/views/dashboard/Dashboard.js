import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from './components/PageContainer';
import CourseList from './components/CourseList';
import ProgressOverview from './components/ProgressOverview';
import { courses, progress } from './components/dummyData';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="Overview of your courses and progress">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CourseList courses={courses} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ProgressOverview progressData={progress} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
