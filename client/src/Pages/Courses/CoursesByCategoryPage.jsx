import React, { useState } from 'react';
import CategoriesMenu from './CategoriesMenu';
import { Container, Table, TableBody, TableCell, Button ,TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axiosInstance from '../../views/authentication/axiosInstance';


const CoursesByCategoryPage = () => {
    const [category, setCategory] = useState('');
    const [courses, setCourses] = useState([]);

    const fetchCoursesByCategory = async (selectedCategory) => {
        try {
            const response = await axiosInstance.get(`/courses/category/${selectedCategory}`);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses by category', error);
        }
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        fetchCoursesByCategory(selectedCategory);
    };

    return (
        <Container>
            <h2>Courses by Category</h2>
            <CategoriesMenu onCategorySelect={handleCategorySelect} />
            {category && (
                <>
                    <h3>Category: {category}</h3>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableCell>{course.title}</TableCell>
                                        <TableCell>{course.description}</TableCell>
                                        <TableCell>
                                            <Button href={`/coursess/${course.id}`} variant="contained">
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Container>
    );
};

export default CoursesByCategoryPage;
