// src/pages/course/CoursePage.js

import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import CourseList from './CourseList';

const CoursePage = () => {
  return (
    <PageContainer title="Courses" description="Browse through our available courses">
      <CourseList />
    </PageContainer>
  );
};

export default CoursePage;
