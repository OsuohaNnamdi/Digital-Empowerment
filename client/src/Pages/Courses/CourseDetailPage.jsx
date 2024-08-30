import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LessonListPage from '../Lessons/LessonListPage';
import axiosInstance from '../../views/authentication/axiosInstance';

const CourseDetailPage = ({ userRole }) => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchCourseDetails();
    }, [courseId]);

    const fetchCourseDetails = async () => {
        try {
            const response = await axiosInstance.get(`/courses/${courseId}`);
            setCourse(response.data);
        } catch (error) {
            console.error('Error fetching course details', error);
        }
    };

    const handleCreateQuiz = (lessonId) => {
        navigate(`/create-quiz/${lessonId}`);
    };

    if (userRole === 'USER' && course) {
        // Redirect to LessonDetailsPage if user role is USER
        return navigate(`/lessons/${courseId}`);
    }

    return (
        <div>
            {course ? (
                <div>
                    <h1>{course.title}</h1>
                    <p>{course.description}</p>
                    <LessonListPage 
                        courseId={courseId} 
                        onCreateQuiz={handleCreateQuiz} // Pass the handler to LessonListPage
                    />
                </div>
            ) : (
                <p>Loading course details...</p>
            )}
        </div>
    );
};

export default CourseDetailPage;
