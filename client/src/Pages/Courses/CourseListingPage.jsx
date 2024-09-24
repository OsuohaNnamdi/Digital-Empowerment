import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Tabs, Tab, Box } from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axiosInstance from '../../views/authentication/axiosInstance';

const CourseListingPage = () => { // Pass userRole as prop
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch categories
        axiosInstance.get('/courses/category/all')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));

        // Fetch all courses initially
        axiosInstance.get('/courses/all')
            .then(response => setCourses(response.data))
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    const handleCategoryChange = (categoryName) => {
        setSelectedCategory(categoryName);
        axiosInstance.get(`/courses/category/${categoryName}`)
            .then(response => setCourses(response.data))
            .catch(error => console.error('Error fetching courses by category:', error));
    };
      const userRole = 'ADMIN';
      
    const handleCourseClick = (courseId) => {
        if (userRole === 'ADMIN') {
            navigate(`/lesson/${courseId}`); // Navigate to CourseDetailPage for admin
        } else {
            navigate(`/coursess/${courseId}`); // Navigate to LessonDetailsPage for user
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Course Listings
            </Typography>
            <Box>
                <Tabs
                    value={selectedCategory || false}
                    onChange={(event, newValue) => handleCategoryChange(newValue)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    {categories.map(category => (
                        <Tab key={category.id} label={category.name} value={category.name} />
                    ))}
                </Tabs>
            </Box>
            <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                    Courses
                </Typography>
                <Scrollbars style={{ height: 400 }}>
                    <Grid container spacing={3}>
                        {courses.map(course => (
                            <Grid item xs={12} sm={6} md={4} key={course.id}>
                                <Card onClick={() => handleCourseClick(course.id)} style={{ cursor: 'pointer' }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={course.imageUrl}
                                        alt={course.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {course.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {course.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Scrollbars>
            </Box>
            <Box mt={5} py={5} sx={{ backgroundColor: '#333', color: '#fff' }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="inherit">
                We provide high-quality online courses to help you learn new skills and advance your career.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Typography variant="body2" color="inherit">
                Home | Courses | About | Contact
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" color="inherit">
                Email: support@tutorialwebsite.com
              </Typography>
              <Typography variant="body2" color="inherit">
                Phone: +123 456 7890
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
        </Container>
    );
};

export default CourseListingPage;
