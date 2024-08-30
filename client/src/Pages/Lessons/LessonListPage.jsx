import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../views/authentication/axiosInstance';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Swal from 'sweetalert2';

const LessonListPage = ({ courseId }) => {
    const [lessons, setLessons] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [newLesson, setNewLesson] = useState({ title: '', content: '', videoUrl: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchLessons();
    }, [courseId]);

    const fetchLessons = async () => {
        try {
            const response = await axiosInstance.get(`/courses/${courseId}/lessons`);
            setLessons(response.data);
        } catch (error) {
            console.error('Error fetching lessons', error);
        }
    };

    const handleOpenDialog = (lesson = null) => {
        setCurrentLesson(lesson);
        setNewLesson({ title: lesson?.title || '', content: lesson?.content || '', videoUrl: lesson?.videoUrl || '' });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentLesson(null);
    };

    const handleDeleteLesson = async (lessonId) => {
        try {
            await axiosInstance.delete(`/lessons/${lessonId}`);
            Swal.fire('Deleted!', 'The lesson has been deleted.', 'success');
            fetchLessons();
        } catch (error) {
            Swal.fire('Error!', 'Failed to delete the lesson.', 'error');
        }
    };

    const handleSubmitLesson = async () => {
        try {
            if (currentLesson) {
                await axiosInstance.put(`/lessons`, { ...currentLesson, title: newLesson.title, content: newLesson.content, videoUrl: newLesson.videoUrl });
                Swal.fire('Updated!', 'The lesson has been updated.', 'success');
            } else {
                await axiosInstance.post(`/lessons`, { ...newLesson, courseId });
                Swal.fire('Created!', 'The lesson has been created.', 'success');
            }
            fetchLessons();
            handleCloseDialog();
        } catch (error) {
            Swal.fire('Error!', 'Failed to save the lesson.', 'error');
        }
    };


    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                Add Lesson
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Video URL</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lessons.map((lesson) => (
                            <TableRow key={lesson.id}>
                                <TableCell>{lesson.title}</TableCell>
                                <TableCell>{lesson.content}</TableCell>
                                <TableCell>{lesson.videoUrl}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpenDialog(lesson)}>Update</Button>
                                    <Button onClick={() => handleDeleteLesson(lesson.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{currentLesson ? 'Update Lesson' : 'Add Lesson'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                 
                        label="Title"
                        fullWidth
                        value={newLesson.title}
                        onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        fullWidth
                        value={newLesson.content}
                        onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Video URL"
                        fullWidth
                        value={newLesson.videoUrl}
                        onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmitLesson}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LessonListPage;
