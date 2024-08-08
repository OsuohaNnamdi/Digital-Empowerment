// src/pages/admin/CourseManagement.js

import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });

  useEffect(() => {
    axios.get('/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddCourse = () => {
    axios.post('/api/courses', newCourse)
      .then(() => {
        setCourses([...courses, newCourse]);
        setNewCourse({ title: '', description: '' });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteCourse = (id) => {
    axios.delete(`/api/courses/${id}`)
      .then(() => {
        setCourses(courses.filter(course => course.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <Box>
      <Typography variant="h4">Manage Courses</Typography>
      <Box sx={{ my: 2 }}>
        <TextField
          label="Title"
          value={newCourse.title}
          onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Description"
          value={newCourse.description}
          onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={handleAddCourse} sx={{ ml: 2 }}>
          Add Course
        </Button>
      </Box>
      <List>
        {courses.map(course => (
          <ListItem key={course.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleDeleteCourse(course.id)}>
                <Delete />
              </IconButton>
              <IconButton edge="end" sx={{ ml: 1 }}>
                <Edit />
              </IconButton>
            </>
          }>
            <ListItemText primary={course.title} secondary={course.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CourseManagement;
