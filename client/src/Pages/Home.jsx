import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Box,
  Button,
  Paper,
} from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../views/authentication/axiosInstance';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userRole, setUserRole] = useState(''); // State for user role
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userType = localStorage.getItem('TYPE') || localStorage.getItem("TYPES");

    if (!userType) {
      // If not logged in, redirect to the login page
      navigate('/auth/login');
    } else {
      setUserRole(userType); // Set the user role

      // Fetch categories
      axiosInstance.get('/courses/category/all')
        .then(response => setCategories(response.data))
        .catch(error => console.error('Error fetching categories:', error));

      // Fetch all courses initially
      axiosInstance.get('/courses/all')
        .then(response => setCourses(response.data))
        .catch(error => console.error('Error fetching courses:', error));
    }
  }, [navigate]);

  const handleCategoryChange = (event, categoryName) => {
    setSelectedCategory(categoryName);
    if (categoryName) {
      axiosInstance.get(`/courses/category/${categoryName}`)
        .then(response => setCourses(response.data))
        .catch(error => console.error('Error fetching courses by category:', error));
    } else {
      axiosInstance.get('/courses/all')
        .then(response => setCourses(response.data))
        .catch(error => console.error('Error fetching courses:', error));
    }
  };

  const handleCourseClick = (courseId) => {
    if (userRole === 'ADMIN') {
      navigate(`/coursess/${courseId}`);
    } else {
      navigate(`/lesson/${courseId}`);
    }
  };

  const handleGetStartedClick = () => {
    navigate('/course');
  };

  return (
    <Container>
      
      <Box sx={{ textAlign: 'center', py: 5, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Our Tutorial Website
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Learn new skills, advance your career, and explore new hobbies.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          sx={{ mt: 2 }}
          onClick={handleGetStartedClick}
        >
          Get Started
        </Button>
      </Box>
      
      
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Browse by Categories
        </Typography>
        <Tabs
          value={selectedCategory || false}
          onChange={handleCategoryChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="All" value={null} />
          {categories.map(category => (
            <Tab key={category.id} label={category.name} value={category.name} />
          ))}
        </Tabs>
        <Box mt={2}>
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
      </Box>

      
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          What Our Students Say
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="body1">
                "This website has transformed my learning experience. The courses are well-structured and easy to follow."
              </Typography>
              <Typography variant="subtitle2" align="right" color="primary" sx={{ mt: 2 }}>
                - John Doe
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="body1">
                "I love the diversity of courses available. There's something for everyone!"
              </Typography>
              <Typography variant="subtitle2" align="right" color="primary" sx={{ mt: 2 }}>
                - Jane Smith
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="body1">
                "The flexibility of learning at my own pace is invaluable. Highly recommend!"
              </Typography>
              <Typography variant="subtitle2" align="right" color="primary" sx={{ mt: 2 }}>
                - Alex Johnson
              </Typography>
            </Paper>
          </Grid>
        </Grid>
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

export default Home;
