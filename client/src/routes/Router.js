import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import CourseDetailPage from '../Pages/Courses/CourseDetailPage';
import AddCoursePage from '../Pages/Courses/AddCoursePage';
import CoursesPage from '../Pages/Courses/CoursesPage';
import CourseByCategoryPage from '../Pages/Courses/CoursesByCategoryPage';
import LessonListPage from '../Pages/Lessons/LessonListPage';
import LessonDetailsPage from '../Pages/Lessons/LessonDetailsPage';
import CourseListingPage from '../Pages/Courses/CourseListingPage';
import Home from '../Pages/Home';
import About from '../Pages/About';




const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));


const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/home" /> },
      { path: '/home', exact: true, element: <Home /> },
      { path: '/about', exact: true, element: <About /> },
      { path: '/course', exact: true, element: <CourseListingPage />  },
      { path: '/coursess', exact: true, element: <CoursesPage /> },
      { path: '/add', exact: true, element: <AddCoursePage /> },
      { path: '/coursess/:courseId', exact: true, element: <CourseDetailPage /> },
      { path: '/category', exact: true, element: <CourseByCategoryPage /> },
      { path: '/lessons', exact: true, element: <LessonListPage /> },
      { path: '/lesson/:lessonId', exact: true, element: <LessonDetailsPage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
