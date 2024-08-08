// src/components/PageContainer.js

import React from 'react';
import { Container, Typography } from '@mui/material';

const PageContainer = ({ title, description, children }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>{title}</Typography>
      <Typography variant="subtitle1" gutterBottom>{description}</Typography>
      {children}
    </Container>
  );
};

export default PageContainer;
