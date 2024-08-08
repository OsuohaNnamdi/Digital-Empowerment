// src/pages/admin/ModuleManagement.js

import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, List, ListItem, ListItemText, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const ModuleManagement = () => {
  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newModule, setNewModule] = useState({ title: '', description: '', content: '', link: '', courseId: '' });

  useEffect(() => {
    axios.get('/api/modules')
      .then(response => setModules(response.data))
      .catch(error => console.error(error));
    axios.get('/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddModule = () => {
    axios.post('/api/modules', newModule)
      .then(() => {
        setModules([...modules, newModule]);
        setNewModule({ title: '', description: '', content: '', link: '', courseId: '' });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteModule = (id) => {
    axios.delete(`/api/modules/${id}`)
      .then(() => {
        setModules(modules.filter(module => module.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <Box>
      <Typography variant="h4">Manage Modules</Typography>
      <Box sx={{ my: 2 }}>
        <TextField
          label="Title"
          value={newModule.title}
          onChange={e => setNewModule({ ...newModule, title: e.target.value })}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Description"
          value={newModule.description}
          onChange={e => setNewModule({ ...newModule, description: e.target.value })}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Content"
          value={newModule.content}
          onChange={e => setNewModule({ ...newModule, content: e.target.value })}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Link"
          value={newModule.link}
          onChange={e => setNewModule({ ...newModule, link: e.target.value })}
          sx={{ mr: 2 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Course</InputLabel>
          <Select
            value={newModule.courseId}
            onChange={e => setNewModule({ ...newModule, courseId: e.target.value })}
          >
            {courses.map(course => (
              <MenuItem key={course.id} value={course.id}>{course.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddModule} sx={{ ml: 2 }}>
          Add Module
        </Button>
      </Box>
      <List>
        {modules.map(module => (
          <ListItem key={module.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleDeleteModule(module.id)}>
                <Delete />
              </IconButton>
              <IconButton edge="end" sx={{ ml: 1 }}>
                <Edit />
              </IconButton>
            </>
          }>
            <ListItemText primary={module.title} secondary={module.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ModuleManagement;
