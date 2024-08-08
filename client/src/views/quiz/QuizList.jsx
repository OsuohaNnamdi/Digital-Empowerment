// src/pages/quiz/QuizList.js

import React from 'react';
import { Card, CardContent, Typography, List, ListItem } from '@mui/material';

const QuizList = ({ quizzes }) => {
  return (
    <List>
      {quizzes.map((quiz) => (
        <ListItem key={quiz.id}>
          <Card sx={{ width: '100%', mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{quiz.questionText}</Typography>
              <Typography variant="body1">Options:</Typography>
              <ul>
                {JSON.parse(quiz.options).map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
              <Typography variant="body1">Correct Answer: {quiz.correctAnswer}</Typography>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default QuizList;
