import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, Grid, Divider, Box } from '@mui/material';
import ReactPlayer from 'react-player';
import Swal from 'sweetalert2'; 
import axiosInstance from '../../views/authentication/axiosInstance';

const LessonDetailsPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchCourseDetailsAndLessons = async () => {
      try {
        const courseResponse = await axiosInstance.get(`/courses/${lessonId}`);
        setCourse(courseResponse.data);

        const lessonsResponse = await axiosInstance.get(`/courses/${lessonId}/lessons`);
        setLessons(lessonsResponse.data);
      } catch (error) {
        Swal.fire('Error', 'Unable to fetch course details and lessons', 'error');
      }
    };

    fetchCourseDetailsAndLessons();
  }, [lessonId]);

  if (!course) {
    return (
      <Container>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h3" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          {course.description}
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h4" gutterBottom>
        Lessons
      </Typography>
      <Grid container spacing={4}>
        {lessons.map((lesson) => (
          <Grid item xs={12} sm={6} md={4} key={lesson.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {lesson.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {lesson.content}
                </Typography>
                {lesson.videoUrl && (
                  <ReactPlayer 
                    url={lesson.videoUrl} 
                    controls 
                    width="100%" 
                    height="auto" 
                    style={{ borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LessonDetailsPage;
