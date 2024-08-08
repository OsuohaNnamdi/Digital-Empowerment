
import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, List, ListItem, ListItemText, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [modules, setModules] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ questionText: '', options: '', correctAnswer: '', moduleId: '' });

  useEffect(() => {
    axios.get('/api/quizzes')
      .then(response => setQuizzes(response.data))
      .catch(error => console.error(error));
    axios.get('/api/modules')
      .then(response => setModules(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddQuiz = () => {
    const quizToAdd = { ...newQuiz, options: JSON.stringify(newQuiz.options.split(',')) };
    axios.post('/api/quizzes', quizToAdd)
      .then(() => {
        setQuizzes([...quizzes, quizToAdd]);
        setNewQuiz({ questionText: '', options: '', correctAnswer: '', moduleId: '' });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteQuiz = (id) => {
    axios.delete(`/api/quizzes/${id}`)
      .then(() => {
        setQuizzes(quizzes.filter(quiz => quiz.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <Box>
      <Typography variant="h4">Manage Quizzes</Typography>
      <Box sx={{ my: 2 }}>
        <TextField
          label="Question Text"
          value={newQuiz.questionText}
          onChange={e => setNewQuiz({ ...newQuiz, questionText: e.target.value })}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Options (comma separated)"
          value={newQuiz.options}
          onChange={e => setNewQuiz({ ...newQuiz, options: e.target.value })}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Correct Answer"
          value={newQuiz.correctAnswer}
          onChange={e => setNewQuiz({ ...newQuiz, correctAnswer: e.target.value })}
          sx={{ mr: 2 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Module</InputLabel>
          <Select
            value={newQuiz.moduleId}
            onChange={e => setNewQuiz({ ...newQuiz, moduleId: e.target.value })}
          >
            {modules.map(module => (
              <MenuItem key={module.id} value={module.id}>{module.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddQuiz} sx={{ ml: 2 }}>
          Add Quiz
        </Button>
      </Box>
      <List>
        {quizzes.map(quiz => (
          <ListItem key={quiz.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleDeleteQuiz(quiz.id)}>
                <Delete />
              </IconButton>
              <IconButton edge="end" sx={{ ml: 1 }}>
                <Edit />
              </IconButton>
            </>
          }>
            <ListItemText primary={quiz.questionText} secondary={`Options: ${JSON.parse(quiz.options).join(', ')}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default QuizManagement;
