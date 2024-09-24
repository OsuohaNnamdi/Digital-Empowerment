import React, { useState } from 'react';
import CategoriesMenu from './CategoriesMenu';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import axiosInstance from '../../views/authentication/axiosInstance';

const CoursesByCategoryPage = () => {
  const [category, setCategory] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoursesByCategory = async (selectedCategory) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/courses/category/${selectedCategory}`);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses by category', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    fetchCoursesByCategory(selectedCategory);
  };

  return (
    <Container maxWidth="lg">
      
      <Box my={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Courses by Category
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Select a category to view the courses available.
        </Typography>
      </Box>

      
      <Box mb={3}>
        <CategoriesMenu onCategorySelect={handleCategorySelect} />
      </Box>

      {/* Loading Spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        category && (
          <>
            {/* Category Header */}
            <Box my={2}>
              <Typography variant="h5" color="primary">
                Category: {category}
              </Typography>
            </Box>

            {/* Courses Table */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.description}</TableCell>
                        <TableCell>
                          <Button
                            href={`/coursess/${course.id}`}
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No courses available in this category.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )
      )}
    </Container>
  );
};

export default CoursesByCategoryPage;
