// src/pages/module/ModulePage.js

import React, { useState } from 'react';
// import axios from 'axios';
import PageContainer from '../../components/container/PageContainer';
import ModuleList from './ModuleList';
import SearchBar from '../../components/SearchBar';

// Mock data for testing
const dummyModules = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming.',
    content: 'Content for Introduction to Programming',
    link: 'https://example.com/module1',
    course: { title: 'Programming Fundamentals' }
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Deep dive into JavaScript.',
    content: 'Content for Advanced JavaScript',
    link: 'https://example.com/module2',
    course: { title: 'JavaScript Mastery' }
  }
];

const ModulePage = () => {
  const [modules, setModules] = useState(dummyModules);

  const handleSearch = async (keyword) => {
    try {
      // Uncomment the following line to use the actual backend
      // const response = await axios.get(`/api/v1/search`, { params: { keyword } });
      
      // Simulating a delay and response for testing with dummy data
      const response = { data: dummyModules.filter(module =>
        module.title.toLowerCase().includes(keyword.toLowerCase()) ||
        module.description.toLowerCase().includes(keyword.toLowerCase())
      ) };

      setModules(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  return (
    <PageContainer title="Modules" description="Explore available modules">
      <SearchBar onSearch={handleSearch} />
      <ModuleList modules={modules} />
    </PageContainer>
  );
};

export default ModulePage;
