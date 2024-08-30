import React, { useState } from 'react';
import { Button, TextField, Container, Typography, IconButton, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axiosInstance from '../../views/authentication/axiosInstance';
import Swal from 'sweetalert2';

const AddCoursePage = () => {
    const [course, setCourse] = useState({
        title: '',
        category: '',
        description: '',
        imageUrl: ''
    });
    const [lessons, setLessons] = useState([]);
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleLessonChange = (index, e) => {
        const newLessons = [...lessons];
        newLessons[index] = { ...newLessons[index], [e.target.name]: e.target.value };
        setLessons(newLessons);
    };

    const handleAddLesson = () => {
        setLessons([...lessons, { title: '', content: '', videoUrl: '' }]);
    };

    const handleRemoveLesson = (index) => {
        setLessons(lessons.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('title', course.title);
        formData.append('category', course.category);
        formData.append('description', course.description);
        formData.append('file', file);

        try {
            const response = await axiosInstance.post('/courses', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const courseId = response.data.id;
            if (courseId && lessons.length > 0) {
                await Promise.all(lessons.map((lesson) =>
                    axiosInstance.post(`/lessons`, { ...lesson, courseId })
                ));
            }

            Swal.fire('Success!', 'Course and lessons have been added.', 'success');
            setCourse({ title: '', category: '', description: '', imageUrl: '' });
            setLessons([]);
            setFile(null);
        } catch (error) {
            console.error('Error adding course', error);
            Swal.fire('Error!', 'Failed to add course.', 'error');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Add New Course</Typography>
            <TextField
                label="Title"
                name="title"
                fullWidth
                value={course.title}
                onChange={handleChange}
                style={{ marginBottom: 20 }}
            />
            <TextField
                label="Category"
                name="category"
                fullWidth
                value={course.category}
                onChange={handleChange}
                style={{ marginBottom: 20 }}
            />
            <TextField
                label="Description"
                name="description"
                fullWidth
                value={course.description}
                onChange={handleChange}
                style={{ marginBottom: 20 }}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginBottom: 20 }}
            />
            <Typography variant="h6" gutterBottom>Lessons</Typography>
            {lessons.map((lesson, index) => (
                <Box key={index} mb={2} border={1} borderRadius={1} padding={2}>
                    <TextField
                        label={`Lesson ${index + 1} Title`}
                        name="title"
                        value={lesson.title}
                        onChange={(e) => handleLessonChange(index, e)}
                        fullWidth
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label={`Lesson ${index + 1} Content`}
                        name="content"
                        value={lesson.content}
                        onChange={(e) => handleLessonChange(index, e)}
                        fullWidth
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label={`Lesson ${index + 1} Video URL`}
                        name="videoUrl"
                        value={lesson.videoUrl}
                        onChange={(e) => handleLessonChange(index, e)}
                        fullWidth
                        style={{ marginBottom: 10 }}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={() => handleRemoveLesson(index)} color="secondary">
                            <Remove />
                        </IconButton>
                    </Box>
                </Box>
            ))}
            <Button onClick={handleAddLesson} variant="contained" color="primary" startIcon={<Add />} style={{ marginBottom: 20 }}>
                Add Lesson
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary" size="large" style={{ marginTop: 20, width: '100%' }}>
                Add Course
            </Button>
        </Container>
    );
};

export default AddCoursePage;
