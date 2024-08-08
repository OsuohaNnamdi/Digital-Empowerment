// src/pages/admin/AdminPanel.js

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import CourseManagement from './CourseManagement';
import ModuleManagement from './ModuleManagement';
import QuizManagement from './QuizManagement';

const AdminPanel = () => {
  const [selectedSection, setSelectedSection] = useState('courses');

  const renderSection = () => {
    switch (selectedSection) {
      case 'courses':
        return <CourseManagement />;
      case 'modules':
        return <ModuleManagement />;
      case 'quizzes':
        return <QuizManagement />;
      default:
        return <CourseManagement />;
    }
    
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button color="inherit" onClick={() => setSelectedSection('courses')}>Courses</Button>
          <Button color="inherit" onClick={() => setSelectedSection('modules')}>Modules</Button>
          <Button color="inherit" onClick={() => setSelectedSection('quizzes')}>Quizzes</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        {renderSection()}
      </Box>
    </Box>
  );
};

export default AdminPanel;
