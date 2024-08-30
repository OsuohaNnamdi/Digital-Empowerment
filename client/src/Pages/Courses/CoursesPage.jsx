import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import axiosInstance from '../../views/authentication/axiosInstance';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axiosInstance.get('/courses/category/All');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses', error);
        }
    };

    const handleOpen = (course) => {
        setSelectedCourse(course);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCourse(null);
    };

    const handleDelete = async (courseId) => {
        try {
            await axiosInstance.delete(`/courses/${courseId}`);
            Swal.fire('Deleted!', 'Course has been deleted.', 'success');
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course', error);
            Swal.fire('Error!', 'Failed to delete course.', 'error');
        }
    };

    const handleUpdate = async () => {
        try {
            await axiosInstance.put('/courses', selectedCourse);
            Swal.fire('Updated!', 'Course has been updated.', 'success');
            fetchCourses();
            handleClose();
        } catch (error) {
            console.error('Error updating course', error);
            Swal.fire('Error!', 'Failed to update course.', 'error');
        }
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.title}</TableCell>
                                <TableCell>{course.category}</TableCell>
                                <TableCell>{course.description}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpen(course)}>Update</Button>
                                    <Button onClick={() => handleDelete(course.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={open} onClose={handleClose}>
                <div style={{ padding: 20 }}>
                    <h2>Update Course</h2>
                    <TextField
                        label="Title"
                        fullWidth
                        value={selectedCourse?.title || ''}
                        onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })}
                        style={{ marginBottom: 20 }}
                    />
                    <TextField
                        label="Category"
                        fullWidth
                        value={selectedCourse?.category || ''}
                        onChange={(e) => setSelectedCourse({ ...selectedCourse, category: e.target.value })}
                        style={{ marginBottom: 20 }}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        value={selectedCourse?.description || ''}
                        onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
                        style={{ marginBottom: 20 }}
                    />
                    <Button onClick={handleUpdate} variant="contained">Update</Button>
                </div>
            </Modal>
        </div>
    );
};

export default CoursesPage;
