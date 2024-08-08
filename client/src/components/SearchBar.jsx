// src/components/SearchBar.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Search Modules
      </Typography>
      <Box display="flex" alignItems="center">
        <TextField
          label="Search by title or description"
          variant="outlined"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
